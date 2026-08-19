// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Nitro's default rollup chunking splits the server bundle in a way that creates a
  // circular import between two generated chunks under the "vercel" preset specifically
  // (createCsrfMiddleware ends up undefined at call time — nitrojs/nitro#3905). Forcing a
  // single-file SSR bundle sidesteps the chunk-ordering bug entirely.
  // `inlineDynamicImports` isn't in @lovable.dev/vite-tanstack-config's narrow nitro type
  // (deliberately kept minimal since Nitro v3 is pre-RC), but it's forwarded to nitro() as-is
  // at runtime — the cast below only bypasses the type check, not the actual behavior.
  nitro: { inlineDynamicImports: true } as { preset?: string },
});
