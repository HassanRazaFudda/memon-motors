import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The Dockerfile sets NEXT_OUTPUT=standalone so the runtime image ships only
  // the traced server files (no devDependencies, no pnpm). Opt-in rather than
  // always-on: standalone output creates symlinks, which can need elevated
  // privileges on Windows, so a plain local `pnpm build` stays unchanged.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  // next/image writes optimized images to disk, and by default may use up to
  // 50% of the free disk space it sees at startup. This site has ~10 source
  // photos, so cap the cache (least-recently-used entries are evicted past it).
  images: {
    maximumDiskCacheSize: 100_000_000,
  },
  // cacheComponents + partialPrefetching (Next 16's experimental PPR/Activity
  // machinery) caused a reproducible "insertBefore ... not a child of this
  // node" crash on every client-side <Link> navigation — the full error
  // stack was pure React-DOM internals (insertOrAppendPlacementNode) with no
  // app code involved, a known-unstable interaction in this Next version.
  // This site has no real need for its granular per-component caching, so
  // disabling it trades nothing we use for a lot of stability.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
