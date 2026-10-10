import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
