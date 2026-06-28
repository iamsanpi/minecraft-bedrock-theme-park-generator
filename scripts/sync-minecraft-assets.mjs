import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

const version = "v1.26.30.5";
const sourceBase = `https://raw.githubusercontent.com/Mojang/bedrock-samples/${version}/resource_pack`;
const cacheRoot = join(homedir(), ".cache/minecraft-kids-map-tool/bedrock-samples", version, "resource_pack");

const previewBlocks = [
  "amethyst_block",
  "barrel",
  "black_concrete",
  "blackstone",
  "blue_carpet",
  "blue_concrete",
  "bookshelf",
  "cherry_leaves",
  "chest",
  "cobblestone",
  "crafting_table",
  "cyan_concrete",
  "deepslate",
  "flower_pot",
  "furnace",
  "glass",
  "grass_block",
  "gray_concrete",
  "iron_block",
  "chain",
  "lantern",
  "light_gray_concrete",
  "lime_carpet",
  "lime_concrete",
  "moss_block",
  "oak_log",
  "oak_planks",
  "oak_stairs",
  "oak_trapdoor",
  "orange_concrete",
  "purple_concrete",
  "quartz_block",
  "red_concrete",
  "red_stained_glass",
  "sea_lantern",
  "smooth_quartz",
  "smooth_stone",
  "stone",
  "stone_bricks",
  "white_carpet",
  "white_concrete",
  "yellow_concrete",
];

const blockAliases = {
  grass_block: "grass",
  iron_chain: "chain",
  oak_trapdoor: "trapdoor",
  sea_lantern: "seaLantern",
};

const fallbackTexturePaths = {
  sea_lantern: ["textures/blocks/sea_lantern"],
};

const entityTexturePaths = ["textures/entity/bed/red", "textures/items/bed_red"];

const texturePathAliases = {
  "textures/blocks/grass_side": "textures/blocks/grass_top",
};

function stripJsonComments(source) {
  return source
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("//"))
    .join("\n");
}

async function exists(path) {
  try {
    const info = await stat(path);
    return info.isFile();
  } catch {
    return false;
  }
}

async function download(relativePath) {
  const target = join(cacheRoot, relativePath);
  if (await exists(target)) return false;
  const url = `${sourceBase}/${relativePath}`;
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const data = new Uint8Array(await response.arrayBuffer());
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, data);
      return true;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 600));
    }
  }
  throw new Error(`Failed to download ${relativePath}: ${lastError instanceof Error ? lastError.message : "unknown error"}`);
}

function firstTexturePath(textureValue) {
  if (!textureValue) return "";
  if (typeof textureValue === "string") return textureValue;
  if (Array.isArray(textureValue)) return firstTexturePath(textureValue[0]);
  if (typeof textureValue === "object") return textureValue.path || "";
  return "";
}

function collectAliases(textureSpec) {
  if (!textureSpec) return [];
  if (typeof textureSpec === "string") return [textureSpec];
  if (typeof textureSpec === "object" && !Array.isArray(textureSpec)) {
    return [...new Set(Object.values(textureSpec).filter((value) => typeof value === "string"))];
  }
  return [];
}

function texturePathsForBlock(block, blocks, terrainTexture) {
  const canonical = blockAliases[block] || block;
  const entry = blocks[canonical];
  const aliases = entry ? collectAliases(entry.textures) : [];
  if (!entry && terrainTexture.texture_data?.[canonical]) aliases.push(canonical);

  const paths = aliases
    .map((alias) => texturePathAliases[firstTexturePath(terrainTexture.texture_data?.[alias]?.textures)] ?? firstTexturePath(terrainTexture.texture_data?.[alias]?.textures))
    .filter(Boolean);

  return [...new Set([...(fallbackTexturePaths[block] || []), ...paths])];
}

await mkdir(cacheRoot, { recursive: true });
await download("blocks.json");
await download("textures/terrain_texture.json");

const blocks = JSON.parse(await readFile(join(cacheRoot, "blocks.json"), "utf8"));
const terrainTexture = JSON.parse(stripJsonComments(await readFile(join(cacheRoot, "textures/terrain_texture.json"), "utf8")));
const texturePaths = new Set();

for (const block of previewBlocks) {
  for (const texturePath of texturePathsForBlock(block, blocks, terrainTexture)) {
    texturePaths.add(texturePath);
  }
}
for (const texturePath of entityTexturePaths) texturePaths.add(texturePath);

const failures = [];
let downloaded = 0;
for (const texturePath of [...texturePaths].sort()) {
  try {
    if (await download(`${texturePath}.png`)) downloaded += 1;
  } catch (error) {
    failures.push(`${texturePath}.png: ${error instanceof Error ? error.message : "unknown error"}`);
  }
}

await writeFile(
  join(cacheRoot, "preview-asset-manifest.json"),
  `${JSON.stringify(
    {
      source: "Mojang/bedrock-samples",
      version,
      sourceBase,
      cacheRoot,
      blockCount: previewBlocks.length,
      textureCount: texturePaths.size,
      downloaded,
      failures,
    },
    null,
    2,
  )}\n`,
);

console.log(`Minecraft Bedrock preview assets synced to ${cacheRoot}`);
console.log(`${texturePaths.size} texture paths checked, ${downloaded} downloaded, ${failures.length} failed.`);
if (failures.length) {
  console.log("Missing textures:");
  for (const failure of failures) console.log(`- ${failure}`);
}
