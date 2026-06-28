# Extending Themes

This project is best understood as an AI-assisted Minecraft Bedrock map authoring pipeline.

The current high-detail large Bedrock scene is the `moon-base` rocket park. The generator also contains other kid-friendly theme concepts, but they do not yet have the same polished, coordinate-authored Bedrock park implementation.

## What "New Theme" Means

Adding a polished theme is more than changing colors or text. A finished theme should include:

- a site plan with roads, landmarks, entrances, and player flow
- full-block foundations and clean walkable surfaces
- structures with usable scale, doors, floors, stairs, and interiors
- theme-specific materials and Minecraft block choices
- preview cameras or view targets that make the theme inspectable
- tests for key coordinates, functions, and Bedrock command limits
- in-game screenshots after export

## Recommended AI-Assisted Workflow

1. Pick a theme and define a clear map brief.
2. Sketch the zones in coordinates: entrance, main route, central landmark, side attractions, and exit/finale.
3. Add a dedicated scene builder in `src/index.ts`, such as `addReferenceVolcanoParkScene`.
4. Split the scene into small functions for terrain, roads, buildings, interiors, decoration, signs, and gameplay helpers.
5. Route the theme through `buildBedrockThemeParkFunction` instead of reusing the moon-base scene.
6. Add tests in `src/index.test.ts` for the theme's key blocks, road widths, interiors, and function names.
7. Run `npm run validate`.
8. Inspect the browser preview.
9. Export a `.mcpack`, import it into Minecraft Bedrock, and capture screenshots.
10. Iterate with the AI/code agent until the Minecraft result matches the intended build.

## Useful Prompt For AI Agents

```text
Add a new polished Minecraft Bedrock theme to this generator.

Theme: <theme name>
Target feeling: <what the player should feel>
Required zones:
- entrance
- main road or path loop
- central landmark
- two side attractions
- one interior building
- final reward area

Constraints:
- use real Bedrock blocks and block states
- keep roads and rooms walkable
- use full-block foundations before decorative slabs/thin layers
- include blueprint comments and bounding boxes
- keep every /fill command below the Bedrock per-command limit
- add tests for major coordinates and function output
- preview first, export only after validation
```

## Why Coordinates Are In Code

The large map is coordinate-authored because Minecraft builds are spatial. A generic data-only theme config is not enough for high-quality buildings, usable roads, proper room height, stairs, doors, landmarks, and sightlines.

The long-term direction is to extract more reusable components, but the first priority is correctness: real Minecraft commands, previewable geometry, and repeatable `.mcpack` output.
