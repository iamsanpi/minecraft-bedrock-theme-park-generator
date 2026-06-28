# Architecture

The generator uses one source of truth: generated Minecraft commands. The browser preview and the exported `.mcpack` are both derived from the same Bedrock function output.

```text
src/index.ts
  -> buildBedrockThemeParkFunction()
  -> Bedrock /fill, /setblock, /function command text
  -> /api/preview-bedrock -> browser voxel preview
  -> /api/export-bedrock  -> .mcpack behavior pack
```

## Why This Matters

The preview is not hand-drawn concept art. It is derived from the same function output that goes into the exported Bedrock behavior pack. That keeps visual iteration closer to what Minecraft will build.

## Current Theme Model

The project currently has one polished large Bedrock reference scene: the `moon-base` rocket theme. Other themes exist as kid-facing concepts, palettes, and simpler command templates, but they are not yet full coordinate-authored large parks.

This is a deliberate tradeoff. Minecraft-scale architecture needs exact positions, layer boundaries, floor heights, entrances, roads, interiors, and material choices. The generator keeps that detail in code so it can be previewed, tested, and exported repeatably.

## Design Principles

- **Generate first, render second:** the map is generated as Minecraft commands before it is visualized.
- **Keep geometry centralized:** coordinates, materials, function names, and structure placement are owned by `src/index.ts`.
- **Use blueprint metadata:** generated comments describe major layer and bounding-box boundaries so large builds stay inspectable.
- **Make preview cheap:** browser iteration is faster than repeated Minecraft imports, especially for large Bedrock maps.
- **Validate Minecraft constraints:** tests guard against oversized Bedrock `/fill` commands and missing gameplay functions.
- **Author new themes explicitly:** a new high-quality theme should get its own scene modules, tests, screenshots, and preview passes.

## Main Boundaries

- `src/index.ts` owns map generation and command layout.
- `public/app.js` owns browser rendering of generated commands.
- `server.mjs` owns local HTTP APIs, downloads, and `.mcpack` packaging.
- `docs/` owns human-facing tutorials and screenshots.

Generated outputs are intentionally excluded from git.

## Data Flow

```text
User chooses theme/modules in the browser
  -> server returns generated Bedrock function text
  -> browser parses command text into voxel preview data
  -> user inspects cameras, metrics, and structure boundaries
  -> server packages the same generated function text into a Bedrock behavior pack
  -> Minecraft runs /function build and /function start
```

## Validation Surface

`npm run validate` runs TypeScript checks and unit tests over the generator. The current tests cover:

- expected function entry points
- large map command markers
- Bedrock per-command `/fill` volume limits
- vehicle-scale road layout
- rocket and launch tower placement
- entrance gate and logo placement
- interior access details and helper functions

For the recommended process for new themes, see [extending-themes.md](extending-themes.md).
