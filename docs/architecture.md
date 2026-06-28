# Architecture

The generator uses one source of truth: generated Minecraft commands.

```text
src/index.ts
  -> Bedrock function command text
  -> /api/preview-bedrock
  -> browser voxel preview
  -> .mcpack behavior pack export
```

## Why This Matters

The preview is not hand-drawn concept art. It is derived from the same function output that goes into the exported Bedrock behavior pack. That keeps visual iteration closer to what Minecraft will build.

## Main Boundaries

- `src/index.ts` owns map generation and command layout.
- `public/app.js` owns browser rendering of generated commands.
- `server.mjs` owns local HTTP APIs, downloads, and `.mcpack` packaging.
- `docs/` owns human-facing tutorials and screenshots.

Generated outputs are intentionally excluded from git.
