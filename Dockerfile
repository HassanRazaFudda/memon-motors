# syntax=docker/dockerfile:1

# Node 24 is the current LTS (Krypton); Next 16 needs >= 20.9.
# alpine over slim, measured on this app: image 311 MB vs 399 MB and ~77 MiB
# less RAM under load, for ~11 s slower code-only rebuilds. The native pieces
# (SWC, Tailwind's Lightning CSS, sharp) all ship musl builds and were verified.
# Pass --build-arg NODE_IMAGE=node:24-slim to switch to glibc.
ARG NODE_IMAGE=node:24-alpine

# ---- deps: install dependencies (cached until the lockfile changes) ---------
FROM ${NODE_IMAGE} AS deps
# pnpm comes straight from npm, not Corepack: Corepack older than 0.36 cannot
# launch pnpm 12 (it looks for the removed bin/pnpm.cjs).
# Keep this version in sync with "packageManager" in package.json.
RUN npm install -g pnpm@12.10.1
WORKDIR /app
# pnpm-workspace.yaml is required: it holds allowBuilds, and pnpm 11+ fails the
# install if a dependency build script (unrs-resolver) is not explicitly allowed.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Put the pnpm store outside the app and delete it in the same RUN, so the
# layer holds node_modules only (no second copy of every package on the VPS).
RUN pnpm install --frozen-lockfile --store-dir /tmp/pnpm-store \
    && rm -rf /tmp/pnpm-store

# ---- build: compile the site -------------------------------------------------
FROM deps AS build
COPY . .
# NEXT_OUTPUT=standalone makes next.config.ts emit .next/standalone (see there).
ENV NEXT_OUTPUT=standalone \
    NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner: the only stage that ships -------------------------------------
# Fresh base: no pnpm, no devDependencies, no source, no build tooling.
FROM ${NODE_IMAGE} AS runner
# NODE_OPTIONS caps V8's heap so a leak can't grow without bound on the VPS
# (this app's live heap is well under it; verified under load with a 256 MiB
# container limit). Override via the NODE_OPTIONS env var if ever needed.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_OPTIONS=--max-old-space-size=128 \
    PORT=3050 \
    HOSTNAME=0.0.0.0
WORKDIR /app
# Unprivileged user; it owns /app/.next so the image optimizer can write
# .next/cache/images (capped by images.maximumDiskCacheSize in next.config.ts).
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
# Set Coolify's exposed port to 3050.
EXPOSE 3050
# Coolify uses an image HEALTHCHECK instead of its dashboard one ("Running (no
# healthcheck)" otherwise) and waits for it before replacing the old container.
# busybox wget ships with alpine (no curl needed). 127.0.0.1, not localhost: the
# server binds IPv4 0.0.0.0 only. HEAD request on `/`; costs ~nothing every 30 s.
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
    CMD wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1
# `node` as PID 1 (not `pnpm start`): one process instead of three, and SIGTERM
# from `docker stop` / Coolify redeploys reaches Next directly for a clean stop.
CMD ["node", "server.js"]
