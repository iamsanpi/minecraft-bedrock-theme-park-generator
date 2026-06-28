export type Edition = "java-worldedit" | "bedrock" | "no-commands";
export type Size = "tiny" | "cozy" | "big";

export interface Theme {
  id: string;
  title: string;
  kidTitle: string;
  palette: string[];
  storyHook: string;
  starterBlocks: string[];
  danger: string;
}

export interface Module {
  id: string;
  title: string;
  kidAction: string;
  parentTip: string;
  commands: Record<Edition, string[]>;
}

export interface PlanConfig {
  themeId: string;
  size: Size;
  edition: Edition;
  moduleIds: string[];
  gentleMode: boolean;
}

export interface BuildPlan {
  title: string;
  mission: string;
  palette: string[];
  starterBlocks: string[];
  checklist: string[];
  commands: string[];
  parentNotes: string[];
}

interface MinecraftBlockSet {
  floor: string;
  wall: string;
  accentA: string;
  accentB: string;
  glass: string;
  light: string;
  reward: string;
}

type BlueprintLayer = "clear" | "foundation" | "route" | "structure" | "decoration";

interface BlueprintBox {
  id: string;
  layer: BlueprintLayer;
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
  block: string;
  mode?: string;
}

export const themes: Theme[] = [
  {
    id: "volcano-security",
    title: "Volcano Security Island",
    kidTitle: "火山安全岛",
    palette: ["stone", "blackstone", "smooth_quartz", "blue_concrete", "lime_concrete", "orange_concrete", "glass"],
    storyHook: "岩浆岛快要喷发了，两个小队友要把宝石安全送进基地。",
    starterBlocks: ["smooth_quartz", "blue_concrete", "lime_concrete", "glass", "iron_bars", "redstone_lamp"],
    danger: "lava",
  },
  {
    id: "candy-village",
    title: "Candy Rescue Village",
    kidTitle: "糖果救援村",
    palette: ["pink_concrete", "yellow_concrete", "white_wool", "lime_wool", "oak_planks", "lantern"],
    storyHook: "糖果村的门被怪物堵住了，今天要修一条安全小路。",
    starterBlocks: ["pink_concrete", "yellow_concrete", "white_wool", "oak_planks", "lantern", "flower_pot"],
    danger: "soft monster gate",
  },
  {
    id: "moon-base",
    title: "Moon Base Launch",
    kidTitle: "月亮基地发射",
    palette: ["cobblestone", "stone_bricks", "white_concrete", "cyan_concrete", "glass", "sea_lantern", "iron_block"],
    storyHook: "月亮基地收到求救信号，需要造火箭、通道和控制室。",
    starterBlocks: ["cobblestone", "stone_bricks", "white_concrete", "cyan_concrete", "glass", "sea_lantern", "iron_block"],
    danger: "meteor timer",
  },
  {
    id: "underwater-castle",
    title: "Underwater Castle",
    kidTitle: "海底城堡",
    palette: ["prismarine", "sea_lantern", "blue_stained_glass", "sandstone", "kelp", "coral_block"],
    storyHook: "海底城堡丢了珍珠，要从透明隧道找到宝藏房。",
    starterBlocks: ["prismarine", "sea_lantern", "blue_stained_glass", "sandstone", "kelp", "coral_block"],
    danger: "drowned patrol",
  },
];

export const modules: Module[] = [
  {
    id: "safe-house",
    title: "双人安全屋",
    kidAction: "选一边给聪明队友，另一边给小乌龟队友。",
    parentTip: "先做 15x15 的低矮房子，正面要清楚，方便孩子看懂入口。",
    commands: {
      "java-worldedit": ["//pos1", "//pos2", "//set smooth_quartz", "//walls blue_concrete", "//replace air glass"],
      bedrock: ["/fill ~-7 ~ ~-7 ~7 ~4 ~7 smooth_quartz hollow", "/fill ~-2 ~1 ~-7 ~2 ~3 ~-7 glass"],
      "no-commands": ["用白色方块围 15x15，蓝色做左边，绿色做右边。"],
    },
  },
  {
    id: "lava-moat",
    title: "安全护城河",
    kidAction: "帮基地外面画一圈危险边界。",
    parentTip: "儿童模式下建议用橙色混凝土代替真岩浆，最后再决定是否换成 lava。",
    commands: {
      "java-worldedit": ["//sel cuboid", "//set orange_concrete", "//replace orange_concrete lava"],
      bedrock: ["/fill ~-12 ~-1 ~-12 ~12 ~-1 ~12 orange_concrete outline"],
      "no-commands": ["绕基地放一圈橙色方块，留一座小桥。"],
    },
  },
  {
    id: "laser-hall",
    title: "假装激光走廊",
    kidAction: "把红色线条摆成不能碰的机关路。",
    parentTip: "不用复杂 mod，先用红色玻璃、红石灯和压力板做可理解的视觉机关。",
    commands: {
      "java-worldedit": ["//line red_stained_glass", "//replace stone pressure_plate"],
      bedrock: ["/fill ~-1 ~1 ~ ~1 ~1 ~10 red_stained_glass", "/setblock ~ ~ ~5 stone_pressure_plate"],
      "no-commands": ["放红色玻璃线，再放几个压力板当机关。"],
    },
  },
  {
    id: "secret-tunnel",
    title: "秘密逃生隧道",
    kidAction: "选择出口藏在树后、床下或瀑布后。",
    parentTip: "隧道要短，最多两个转弯，孩子更容易记住路线。",
    commands: {
      "java-worldedit": ["//copy", "//paste", "//replace stone air"],
      bedrock: ["/fill ~-1 ~-1 ~ ~1 ~1 ~12 air", "/fill ~-1 ~-2 ~ ~1 ~-2 ~12 oak_planks"],
      "no-commands": ["挖一条 3 格宽、3 格高的小通道，出口放活板门。"],
    },
  },
  {
    id: "treasure-room",
    title: "宝藏领奖房",
    kidAction: "把今天最喜欢的方块放进宝箱旁边。",
    parentTip: "每次游玩都让孩子选择奖励物，形成正反馈。",
    commands: {
      "java-worldedit": ["//set gold_block", "//replace air chest"],
      bedrock: ["/fill ~-4 ~ ~-4 ~4 ~4 ~4 gold_block hollow", "/setblock ~ ~1 ~ chest"],
      "no-commands": ["造一个金色小房间，中间放宝箱和告示牌。"],
    },
  },
  {
    id: "parkour-steps",
    title: "小跳跳路线",
    kidAction: "选择简单、中等或勇敢三个跳跃距离。",
    parentTip: "小朋友版本优先 1 格间距，不要用失败惩罚，下面铺水或软垫色块。",
    commands: {
      "java-worldedit": ["//stack 8 east", "//replace air slime_block"],
      bedrock: ["/setblock ~ ~ ~ stone", "/setblock ~2 ~ ~ stone", "/setblock ~4 ~ ~ slime"],
      "no-commands": ["每隔 1 到 2 格放一个台阶，下面铺绿色软垫。"],
    },
  },
];

const sizeLabel: Record<Size, string> = {
  tiny: "20 分钟小地图",
  cozy: "一晚可以完成",
  big: "周末大型地图",
};

const minecraftBlocksByTheme: Record<string, MinecraftBlockSet> = {
  "volcano-security": {
    floor: "smooth_stone",
    wall: "smooth_quartz",
    accentA: "blue_concrete",
    accentB: "lime_concrete",
    glass: "glass",
    light: "redstone_lamp",
    reward: "gold_block",
  },
  "candy-village": {
    floor: "oak_planks",
    wall: "white_wool",
    accentA: "pink_concrete",
    accentB: "yellow_concrete",
    glass: "pink_stained_glass",
    light: "lantern",
    reward: "emerald_block",
  },
  "moon-base": {
    floor: "light_gray_concrete",
    wall: "white_concrete",
    accentA: "cyan_concrete",
    accentB: "iron_block",
    glass: "glass",
    light: "sea_lantern",
    reward: "diamond_block",
  },
  "underwater-castle": {
    floor: "sandstone",
    wall: "prismarine",
    accentA: "blue_stained_glass",
    accentB: "sea_lantern",
    glass: "blue_stained_glass",
    light: "sea_lantern",
    reward: "gold_block",
  },
};

export function buildPlan(config: PlanConfig): BuildPlan {
  const theme = themes.find((item) => item.id === config.themeId) ?? themes[0];
  if (!theme) {
    throw new Error("No themes are configured.");
  }

  const selectedModules = config.moduleIds
    .map((id) => modules.find((item) => item.id === id))
    .filter((item): item is Module => Boolean(item));

  const effectiveModules = selectedModules.length > 0 ? selectedModules : modules.slice(0, 3);
  const danger = config.gentleMode ? "安全版机关" : theme.danger;

  return {
    title: `${theme.kidTitle} - ${sizeLabel[config.size]}`,
    mission: `${theme.storyHook} 今天的危险元素是 ${danger}，目标是完成 ${effectiveModules.length} 个小任务。`,
    palette: theme.palette,
    starterBlocks: theme.starterBlocks,
    checklist: effectiveModules.map((item, index) => `${index + 1}. ${item.title}: ${item.kidAction}`),
    commands: effectiveModules.flatMap((item) => item.commands[config.edition]),
    parentNotes: effectiveModules.map((item) => `${item.title}: ${item.parentTip}`),
  };
}

export function getThemeIds(): string[] {
  return themes.map((theme) => theme.id);
}

export function getModuleIds(): string[] {
  return modules.map((module) => module.id);
}

export function buildMinecraftFunction(config: PlanConfig): string {
  const theme = themes.find((item) => item.id === config.themeId) ?? themes[0];
  if (!theme) {
    throw new Error("No themes are configured.");
  }

  const blocks = minecraftBlocksByTheme[theme.id] ?? minecraftBlocksByTheme["moon-base"];
  if (!blocks) {
    throw new Error(`Missing Minecraft blocks for theme ${theme.id}.`);
  }

  const selected = new Set(config.moduleIds.length > 0 ? config.moduleIds : modules.slice(0, 3).map((module) => module.id));
  const dangerBlock = config.gentleMode ? "orange_concrete" : "lava";
  const commands = [
    `# Kids Map Tool: ${theme.kidTitle}`,
    "# Stand where the center of the map should be, then run /function kidsmap:build",
    "gamerule commandBlockOutput false",
    "time set day",
    "weather clear",
    "fill ~-20 ~ ~-20 ~20 ~14 ~20 air",
    `fill ~-20 ~-1 ~-20 ~20 ~-1 ~20 ${blocks.floor}`,
    `fill ~-2 ~ ~-20 ~2 ~ ~20 ${blocks.accentA}`,
    `fill ~-20 ~ ~-2 ~20 ~ ~2 ${blocks.accentA}`,
  ];

  if (selected.has("safe-house")) {
    commands.push(
      "# 双人安全屋",
      `fill ~-8 ~ ~-8 ~8 ~6 ~8 ${blocks.wall} hollow`,
      `fill ~-7 ~1 ~-8 ~-1 ~4 ~-8 ${blocks.glass}`,
      "fill ~1 ~1 ~-8 ~7 ~4 ~-8 lime_stained_glass",
      "fill ~-1 ~ ~-8 ~1 ~2 ~-8 air",
      `setblock ~0 ~5 ~0 ${blocks.light}`,
      `fill ~-7 ~ ~-7 ~-1 ~ ~-1 ${blocks.accentA}`,
      `fill ~1 ~ ~1 ~7 ~ ~7 ${blocks.accentB}`,
    );
  }

  if (selected.has("lava-moat")) {
    commands.push(
      "# 安全护城河 / 月球防护带",
      `fill ~-13 ~ ~-13 ~13 ~ ~-13 ${dangerBlock}`,
      `fill ~-13 ~ ~13 ~13 ~ ~13 ${dangerBlock}`,
      `fill ~-13 ~ ~-13 ~-13 ~ ~13 ${dangerBlock}`,
      `fill ~13 ~ ~-13 ~13 ~ ~13 ${dangerBlock}`,
      `fill ~-2 ~ ~-13 ~2 ~ ~-13 ${blocks.floor}`,
    );
  }

  if (selected.has("laser-hall")) {
    commands.push(
      "# 假装激光走廊",
      "fill ~-3 ~1 ~-5 ~3 ~1 ~-5 red_stained_glass",
      "fill ~-3 ~2 ~-3 ~3 ~2 ~-3 red_stained_glass",
      "fill ~-3 ~1 ~-1 ~3 ~1 ~-1 red_stained_glass",
      "setblock ~0 ~0 ~-4 stone_pressure_plate",
      "setblock ~0 ~0 ~-2 stone_pressure_plate",
    );
  }

  if (selected.has("secret-tunnel")) {
    commands.push(
      "# 秘密逃生隧道",
      "fill ~-1 ~ ~9 ~1 ~2 ~20 air",
      `fill ~-1 ~-1 ~9 ~1 ~-1 ~20 ${blocks.floor}`,
      `fill ~-2 ~ ~20 ~2 ~3 ~24 ${blocks.wall} hollow`,
      "fill ~-1 ~ ~20 ~1 ~2 ~20 air",
      `setblock ~0 ~3 ~22 ${blocks.light}`,
    );
  }

  if (selected.has("treasure-room")) {
    commands.push(
      "# 宝藏领奖房",
      `fill ~-5 ~ ~11 ~5 ~4 ~19 ${blocks.reward} hollow`,
      `fill ~-3 ~1 ~11 ~3 ~3 ~11 ${blocks.glass}`,
      "fill ~-1 ~ ~11 ~1 ~2 ~11 air",
      "setblock ~0 ~1 ~15 chest",
      `setblock ~0 ~3 ~15 ${blocks.light}`,
    );
  }

  if (selected.has("parkour-steps")) {
    commands.push(
      "# 小跳跳路线",
      "setblock ~-12 ~1 ~-1 slime_block",
      `setblock ~-10 ~1 ~-1 ${blocks.accentA}`,
      `setblock ~-8 ~2 ~-1 ${blocks.accentB}`,
      `setblock ~-6 ~2 ~-1 ${blocks.accentA}`,
      `setblock ~-4 ~3 ~-1 ${blocks.accentB}`,
      "fill ~-13 ~0 ~-2 ~-3 ~0 ~0 water",
    );
  }

  commands.push(
    `title @a title {"text":"${theme.kidTitle} 完成!","color":"aqua","bold":true}`,
    `title @a subtitle {"text":"现在可以开始探险了","color":"yellow"}`,
    "say Kids Map Tool: map built. Run /function kidsmap:clear if you want to remove the build area.",
  );

  return `${commands.join("\n")}\n`;
}

export function buildMinecraftClearFunction(): string {
  return [
    "# Remove the generated build around your current position.",
    "fill ~-20 ~ ~-20 ~20 ~14 ~20 air",
    "fill ~-20 ~-1 ~-20 ~20 ~-1 ~20 grass_block",
    "say Kids Map Tool: build area cleared.",
    "",
  ].join("\n");
}

function relative(value: number): string {
  return value === 0 ? "~" : `~${value}`;
}

function relativeBuildY(value: number): string {
  const shifted = value - 1;
  return shifted === 0 ? "~" : `~${shifted}`;
}

function fillBedrock(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, block: string, mode = ""): string {
  const suffix = mode ? ` ${mode}` : "";
  return `fill ${relative(x1)} ${relativeBuildY(y1)} ${relative(z1)} ${relative(x2)} ${relativeBuildY(y2)} ${relative(z2)} ${block}${suffix}`;
}

function setBedrock(x: number, y: number, z: number, block: string): string {
  return `setblock ${relative(x)} ${relativeBuildY(y)} ${relative(z)} ${block}`;
}

function addBlueprintBoxes(commands: string[], title: string, boxes: BlueprintBox[]): void {
  const layerOrder: BlueprintLayer[] = ["clear", "foundation", "route", "structure", "decoration"];
  commands.push(`# Blueprint: ${title}`);
  for (const layer of layerOrder) {
    const layerBoxes = boxes.filter((box) => box.layer === layer);
    if (!layerBoxes.length) continue;
    commands.push(`# Blueprint layer ${layer}: ${layerBoxes.map((box) => box.id).join(", ")}`);
    for (const box of layerBoxes) {
      commands.push(
        `# Blueprint box ${layer}/${box.id}: ${box.x1},${box.y1},${box.z1} -> ${box.x2},${box.y2},${box.z2} ${box.block}${box.mode ? ` ${box.mode}` : ""}`,
      );
    }
  }
}

function tellraw(text: string): string {
  const escaped = text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `tellraw @a {"rawtext":[{"text":"${escaped}"}]}`;
}

const pixelLetters: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10011", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
};

function drawPixelText(text: string, startX: number, baseY: number, z: number, block: string): string[] {
  const commands: string[] = [];
  let cursor = startX;

  for (const char of text.toUpperCase()) {
    if (char === " ") {
      cursor += 4;
      continue;
    }
    const pattern = pixelLetters[char];
    if (!pattern) {
      cursor += 6;
      continue;
    }
    for (let row = 0; row < pattern.length; row += 1) {
      const line = pattern[row];
      if (!line) continue;
      for (let col = 0; col < line.length; col += 1) {
        if (line[col] === "1") {
          commands.push(setBedrock(cursor + col, baseY + (pattern.length - 1 - row), z, block));
        }
      }
    }
    cursor += 6;
  }

  return commands;
}

function measurePixelText(text: string): number {
  let width = 0;
  for (const char of text.toUpperCase()) {
    width += char === " " ? 4 : 6;
  }
  return Math.max(0, width - 1);
}

function drawPixelTextMirrored(text: string, startX: number, baseY: number, z: number, block: string): string[] {
  const commands: string[] = [];
  const span = measurePixelText(text);
  let cursor = 0;

  for (const char of text.toUpperCase()) {
    if (char === " ") {
      cursor += 4;
      continue;
    }
    const pattern = pixelLetters[char];
    if (!pattern) {
      cursor += 6;
      continue;
    }
    for (let row = 0; row < pattern.length; row += 1) {
      const line = pattern[row];
      if (!line) continue;
      for (let col = 0; col < line.length; col += 1) {
        if (line[col] === "1") {
          commands.push(setBedrock(startX + span - (cursor + col), baseY + (pattern.length - 1 - row), z, block));
        }
      }
    }
    cursor += 6;
  }

  return commands;
}

function drawPixelTextMirroredScaled(text: string, startX: number, baseY: number, z: number, block: string, scale = 2): string[] {
  const commands: string[] = [];
  const span = measurePixelText(text);
  let cursor = 0;

  for (const char of text.toUpperCase()) {
    if (char === " ") {
      cursor += 4;
      continue;
    }
    const pattern = pixelLetters[char];
    if (!pattern) {
      cursor += 6;
      continue;
    }
    for (let row = 0; row < pattern.length; row += 1) {
      const line = pattern[row];
      if (!line) continue;
      for (let col = 0; col < line.length; col += 1) {
        if (line[col] === "1") {
          const mirroredOffset = span - (cursor + col);
          const x = startX + mirroredOffset * scale;
          const y = baseY + (pattern.length - 1 - row) * scale;
          commands.push(fillBedrock(x, y, z, x + scale - 1, y + scale - 1, z, block));
        }
      }
    }
    cursor += 6;
  }

  return commands;
}

function drawPixelTextScaled(text: string, startX: number, baseY: number, z: number, block: string, scale = 2): string[] {
  const commands: string[] = [];
  let cursor = 0;

  for (const char of text.toUpperCase()) {
    if (char === " ") {
      cursor += 4;
      continue;
    }
    const pattern = pixelLetters[char];
    if (!pattern) {
      cursor += 6;
      continue;
    }
    for (let row = 0; row < pattern.length; row += 1) {
      const line = pattern[row];
      if (!line) continue;
      for (let col = 0; col < line.length; col += 1) {
        if (line[col] === "1") {
          const x = startX + (cursor + col) * scale;
          const y = baseY + (pattern.length - 1 - row) * scale;
          commands.push(fillBedrock(x, y, z, x + scale - 1, y + scale - 1, z, block));
        }
      }
    }
    cursor += 6;
  }

  return commands;
}

function fillTiledBedrock(commands: string[], x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, block: string): void {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  function pushChunk(cx1: number, cy1: number, cz1: number, cx2: number, cy2: number, cz2: number): void {
    const width = cx2 - cx1 + 1;
    const height = cy2 - cy1 + 1;
    const depth = cz2 - cz1 + 1;
    const volume = width * height * depth;
    if (volume <= 30000) {
      commands.push(fillBedrock(cx1, cy1, cz1, cx2, cy2, cz2, block));
      return;
    }

    if (width >= height && width >= depth && width > 1) {
      const mid = Math.floor((cx1 + cx2) / 2);
      pushChunk(cx1, cy1, cz1, mid, cy2, cz2);
      pushChunk(mid + 1, cy1, cz1, cx2, cy2, cz2);
    } else if (depth >= height && depth > 1) {
      const mid = Math.floor((cz1 + cz2) / 2);
      pushChunk(cx1, cy1, cz1, cx2, cy2, mid);
      pushChunk(cx1, cy1, mid + 1, cx2, cy2, cz2);
    } else {
      const mid = Math.floor((cy1 + cy2) / 2);
      pushChunk(cx1, cy1, cz1, cx2, mid, cz2);
      pushChunk(cx1, mid + 1, cz1, cx2, cy2, cz2);
    }
  }

  pushChunk(minX, minY, minZ, maxX, maxY, maxZ);
}

function clearLargeBedrockPark(commands: string[]): void {
  fillTiledBedrock(commands, -212, 0, -232, 212, 100, 196, "air");
}

function addLampGrid(commands: string[], block: string): void {
  for (const x of [-64, -32, 0, 32, 64]) {
    for (const z of [-64, -32, 0, 32, 64]) {
      commands.push(setBedrock(x, 1, z, block));
      commands.push(setBedrock(x, 2, z, "black_concrete"));
      commands.push(setBedrock(x, 3, z, block));
    }
  }
}

function addStripedFloor(commands: string[], x1: number, z1: number, x2: number, z2: number, blockA: string, blockB: string): void {
  for (let x = x1; x <= x2; x += 4) {
    commands.push(fillBedrock(x, 0, z1, Math.min(x + 1, x2), 0, z2, blockA));
  }
  for (let z = z1; z <= z2; z += 4) {
    commands.push(fillBedrock(x1, 0, z, x2, 0, Math.min(z + 1, z2), blockB));
  }
}

function addLowFence(commands: string[], x1: number, z1: number, x2: number, z2: number, block: string, light: string): void {
  commands.push(
    fillBedrock(x1, 1, z1, x2, 1, z1, block),
    fillBedrock(x1, 1, z2, x2, 1, z2, block),
    fillBedrock(x1, 1, z1, x1, 1, z2, block),
    fillBedrock(x2, 1, z1, x2, 1, z2, block),
  );

  for (let x = x1; x <= x2; x += 8) {
    commands.push(setBedrock(x, 2, z1, light), setBedrock(x, 2, z2, light));
  }
  for (let z = z1; z <= z2; z += 8) {
    commands.push(setBedrock(x1, 2, z, light), setBedrock(x2, 2, z, light));
  }
}

function addBoxShell(commands: string[], x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, block: string): void {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  commands.push(
    fillBedrock(minX, minY, minZ, maxX, minY, maxZ, block),
    fillBedrock(minX, maxY, minZ, maxX, maxY, maxZ, block),
  );
  if (maxY > minY) {
    commands.push(
      fillBedrock(minX, minY + 1, minZ, maxX, maxY - 1, minZ, block),
      fillBedrock(minX, minY + 1, maxZ, maxX, maxY - 1, maxZ, block),
      fillBedrock(minX, minY + 1, minZ, minX, maxY - 1, maxZ, block),
      fillBedrock(maxX, minY + 1, minZ, maxX, maxY - 1, maxZ, block),
    );
  }
}

function addFlagPole(commands: string[], x: number, z: number, color: string, light: string): void {
  commands.push(
    fillBedrock(x, 1, z, x, 7, z, "iron_block"),
    setBedrock(x, 8, z, light),
    fillBedrock(x + 1, 6, z, x + 4, 7, z, color),
    setBedrock(x + 4, 5, z, color),
  );
}

function hangingLanternBlock(): string {
  return 'lantern["hanging_bit"=true]';
}

function addHangingLantern(commands: string[], x: number, ceilingY: number, z: number, drop = 2): void {
  const lampY = ceilingY - drop;
  commands.push(
    fillBedrock(x, lampY + 1, z, x, ceilingY, z, "chain"),
    setBedrock(x, lampY, z, hangingLanternBlock()),
  );
}

function woodenDoorBlock(direction: "east" | "west" | "north" | "south", upper: boolean, hinge = false): string {
  return `wooden_door["door_hinge_bit"=${hinge},"minecraft:cardinal_direction"="${direction}","open_bit"=false,"upper_block_bit"=${upper}]`;
}

function smoothQuartzStairBlock(direction: 0 | 1 | 2 | 3): string {
  return `smooth_quartz_stairs["upside_down_bit"=false,"weirdo_direction"=${direction}]`;
}

function ladderBlock(facingDirection: 2 | 3 | 4 | 5): string {
  return `ladder["facing_direction"=${facingDirection}]`;
}

function bedBlock(direction: 0 | 1 | 2 | 3, headPiece: boolean): string {
  return `bed["direction"=${direction},"head_piece_bit"=${headPiece},"occupied_bit"=false]`;
}

function addDoubleDoorOnX(commands: string[], x: number, y: number, z1: number, z2: number, direction: "east" | "west"): void {
  commands.push(
    setBedrock(x, y, z1, woodenDoorBlock(direction, false, false)),
    setBedrock(x, y + 1, z1, woodenDoorBlock(direction, true, false)),
    setBedrock(x, y, z2, woodenDoorBlock(direction, false, true)),
    setBedrock(x, y + 1, z2, woodenDoorBlock(direction, true, true)),
    setBedrock(x, y, z1 - 1, "stone_pressure_plate"),
    setBedrock(x, y, z2 + 1, "stone_pressure_plate"),
  );
}

function addWallArtOnZ(commands: string[], x1: number, y1: number, z: number, accent: string): void {
  commands.push(
    fillBedrock(x1, y1, z, x1 + 8, y1 + 5, z, "brown_concrete"),
    fillBedrock(x1 + 1, y1 + 1, z, x1 + 7, y1 + 4, z, "light_blue_concrete"),
    fillBedrock(x1 + 2, y1 + 2, z, x1 + 3, y1 + 3, z, accent),
    fillBedrock(x1 + 5, y1 + 1, z, x1 + 6, y1 + 2, z, "yellow_concrete"),
  );
}

function addTicketBooth(commands: string[], x: number, z: number, color: string, blocks: MinecraftBlockSet): void {
  commands.push(
    fillBedrock(x - 3, 1, z - 2, x + 3, 4, z + 2, blocks.wall, "hollow"),
    fillBedrock(x - 2, 1, z - 2, x + 2, 2, z - 2, blocks.glass),
    fillBedrock(x - 3, 5, z - 3, x + 3, 5, z + 3, color),
    setBedrock(x, 4, z, blocks.light),
    setBedrock(x, 1, z + 2, "gold_block"),
    fillBedrock(x - 1, 1, z + 3, x + 1, 1, z + 7, color),
  );
}

function addBench(commands: string[], x: number, z: number, facing: "x" | "z", color: string): void {
  if (facing === "x") {
    commands.push(
      fillBedrock(x - 2, 1, z, x + 2, 1, z, color),
      setBedrock(x - 2, 0, z, "black_concrete"),
      setBedrock(x + 2, 0, z, "black_concrete"),
    );
  } else {
    commands.push(
      fillBedrock(x, 1, z - 2, x, 1, z + 2, color),
      setBedrock(x, 0, z - 2, "black_concrete"),
      setBedrock(x, 0, z + 2, "black_concrete"),
    );
  }
}

function addMiniCrater(commands: string[], x: number, z: number, rim: string, core: string): void {
  commands.push(
    setBedrock(x, 0, z, core),
    fillBedrock(x - 2, 0, z, x + 2, 0, z, rim),
    fillBedrock(x, 0, z - 2, x, 0, z + 2, rim),
    setBedrock(x - 1, 0, z - 1, rim),
    setBedrock(x + 1, 0, z - 1, rim),
    setBedrock(x - 1, 0, z + 1, rim),
    setBedrock(x + 1, 0, z + 1, rim),
  );
}

function addCrystalCluster(commands: string[], x: number, z: number, height: number, color: string, light: string): void {
  commands.push(
    fillBedrock(x, 1, z, x, height, z, color),
    fillBedrock(x - 1, 1, z, x - 1, Math.max(2, height - 2), z, color),
    fillBedrock(x + 1, 1, z, x + 1, Math.max(2, height - 1), z, color),
    setBedrock(x, height + 1, z, light),
  );
}

function addQueueMarkers(commands: string[], x1: number, z1: number, x2: number, z2: number, colorA: string, colorB: string): void {
  const horizontal = z1 === z2;
  if (horizontal) {
    const step = x1 <= x2 ? 3 : -3;
    for (let x = x1; step > 0 ? x <= x2 : x >= x2; x += step) {
      commands.push(setBedrock(x, 1, z1, (Math.abs(x) / 3) % 2 === 0 ? colorA : colorB));
    }
  } else {
    const step = z1 <= z2 ? 3 : -3;
    for (let z = z1; step > 0 ? z <= z2 : z >= z2; z += step) {
      commands.push(setBedrock(x1, 1, z, (Math.abs(z) / 3) % 2 === 0 ? colorA : colorB));
    }
  }
}

function addSpectatorStand(commands: string[], x1: number, z1: number, x2: number, z2: number, color: string, blocks: MinecraftBlockSet): void {
  const xStep = x1 <= x2 ? 1 : -1;
  const zStep = z1 <= z2 ? 1 : -1;
  for (let level = 0; level < 4; level += 1) {
    const sx1 = x1 + level * xStep;
    const sz1 = z1 + level * zStep;
    const sx2 = x2;
    const sz2 = z2;
    commands.push(fillBedrock(sx1, 1 + level, sz1, sx2, 1 + level, sz2, level % 2 === 0 ? color : blocks.wall));
  }
  commands.push(setBedrock(x1, 5, z1, blocks.light), setBedrock(x2, 5, z2, blocks.light));
}

function addControlConsole(commands: string[], x: number, z: number, color: string, blocks: MinecraftBlockSet): void {
  commands.push(
    fillBedrock(x - 2, 1, z, x + 2, 1, z, "black_concrete"),
    setBedrock(x - 2, 2, z, "redstone_lamp"),
    setBedrock(x - 1, 2, z, color),
    setBedrock(x, 2, z, blocks.light),
    setBedrock(x + 1, 2, z, "emerald_block"),
    setBedrock(x + 2, 2, z, "gold_block"),
  );
}

function addEntrance(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Entrance gate",
    fillBedrock(-28, 0, -78, 28, 0, -72, "black_concrete"),
    fillBedrock(-26, 1, -78, -22, 12, -76, blocks.wall),
    fillBedrock(22, 1, -78, 26, 12, -76, blocks.wall),
    fillBedrock(-26, 11, -78, 26, 14, -76, blocks.wall),
    fillBedrock(-18, 1, -77, 18, 3, -77, blocks.glass),
    fillBedrock(-5, 0, -78, 5, 0, -65, blocks.accentA),
    setBedrock(-28, 13, -77, blocks.light),
    setBedrock(28, 13, -77, blocks.light),
    "# MOON PARK pixel sign",
    ...drawPixelText("MOON PARK", -24, 15, -77, "yellow_concrete"),
  );
  addTicketBooth(commands, -16, -66, "cyan_concrete", blocks);
  addTicketBooth(commands, 16, -66, "lime_concrete", blocks);
  addFlagPole(commands, -34, -74, "blue_concrete", blocks.light);
  addFlagPole(commands, 30, -74, "lime_concrete", blocks.light);
  addFlagPole(commands, -38, -66, "yellow_concrete", blocks.light);
  addFlagPole(commands, 34, -66, "red_concrete", blocks.light);
  addQueueMarkers(commands, -8, -64, -8, -48, "yellow_concrete", "cyan_concrete");
  addQueueMarkers(commands, 8, -64, 8, -48, "yellow_concrete", "lime_concrete");
  addLowFence(commands, -36, -71, 36, -48, "black_concrete", blocks.light);
  for (const x of [-26, -18, -10, 10, 18, 26]) {
    addBench(commands, x, -54, "x", x < 0 ? "blue_concrete" : "lime_concrete");
  }
}

function addCentralRocket(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Central plaza and rocket",
    fillBedrock(-16, 0, -16, 16, 0, 16, blocks.wall),
    fillBedrock(-14, 0, -14, 14, 0, 14, blocks.floor),
    fillBedrock(-2, 1, -2, 2, 18, 2, "white_concrete"),
    fillBedrock(-1, 19, -1, 1, 21, 1, "red_concrete"),
    fillBedrock(-4, 1, -4, -3, 7, -3, "cyan_concrete"),
    fillBedrock(3, 1, -4, 4, 7, -3, "lime_concrete"),
    fillBedrock(-4, 1, 3, -3, 7, 4, "cyan_concrete"),
    fillBedrock(3, 1, 3, 4, 7, 4, "lime_concrete"),
    fillBedrock(-2, 0, 3, 2, 0, 7, "orange_concrete"),
    fillBedrock(-1, 1, 4, 1, 3, 6, "yellow_concrete"),
    setBedrock(0, 22, 0, blocks.light),
    setBedrock(0, 1, -10, "gold_block"),
    setBedrock(0, 1, 10, "emerald_block"),
    setBedrock(-10, 1, 0, "diamond_block"),
    setBedrock(10, 1, 0, "amethyst_block"),
  );
  addStripedFloor(commands, -20, -20, 20, 20, "cyan_concrete", "white_concrete");
  addLowFence(commands, -22, -22, 22, 22, "black_concrete", blocks.light);
  commands.push(
    fillBedrock(-8, 1, -8, -8, 18, 8, "iron_block"),
    fillBedrock(-11, 1, -8, -11, 16, 8, "iron_block"),
    fillBedrock(-11, 5, -8, -8, 5, 8, "iron_block"),
    fillBedrock(-11, 10, -8, -8, 10, 8, "iron_block"),
    fillBedrock(-11, 15, -8, -8, 15, 8, "iron_block"),
    fillBedrock(-10, 16, -8, -9, 16, 8, blocks.light),
    fillBedrock(-7, 3, -2, -3, 3, -2, "glass"),
    fillBedrock(-7, 8, 2, -3, 8, 2, "glass"),
    fillBedrock(6, 1, -6, 12, 4, -2, blocks.wall, "hollow"),
    fillBedrock(6, 1, 2, 12, 4, 6, blocks.wall, "hollow"),
  );
  addControlConsole(commands, 9, -4, "red_concrete", blocks);
  addControlConsole(commands, 9, 4, "lime_concrete", blocks);
  for (const [x, z] of [
    [-18, -18],
    [18, -18],
    [-18, 18],
    [18, 18],
    [0, -22],
    [0, 22],
    [-22, 0],
    [22, 0],
  ] as const) {
    commands.push(setBedrock(x, 1, z, "gold_block"), setBedrock(x, 2, z, blocks.light));
  }
}

function addDuoHq(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Duo HQ: two-color teamwork base",
    fillBedrock(-58, 0, -18, -26, 6, 18, blocks.wall, "hollow"),
    fillBedrock(26, 0, -18, 58, 6, 18, blocks.wall, "hollow"),
    fillBedrock(-57, 0, -17, -27, 0, 17, "blue_concrete"),
    fillBedrock(27, 0, -17, 57, 0, 17, "lime_concrete"),
    fillBedrock(-47, 1, -18, -37, 4, -18, blocks.glass),
    fillBedrock(37, 1, -18, 47, 4, -18, blocks.glass),
    fillBedrock(-43, 7, -10, -41, 11, 10, "blue_concrete"),
    fillBedrock(41, 7, -10, 43, 11, 10, "lime_concrete"),
    fillBedrock(-42, 8, -11, -42, 8, 11, blocks.light),
    fillBedrock(42, 8, -11, 42, 8, 11, blocks.light),
    fillBedrock(-30, 0, -2, 30, 0, 2, blocks.accentA),
  );
  addLowFence(commands, -62, -22, -22, 22, "blue_concrete", blocks.light);
  addLowFence(commands, 22, -22, 62, 22, "lime_concrete", blocks.light);
  commands.push(
    fillBedrock(-56, 7, -16, -28, 7, 16, "blue_concrete"),
    fillBedrock(28, 7, -16, 56, 7, 16, "lime_concrete"),
    fillBedrock(-54, 8, -14, -30, 9, 14, "glass"),
    fillBedrock(30, 8, -14, 54, 9, 14, "glass"),
    fillBedrock(-18, 4, -3, 18, 5, 3, "glass"),
    fillBedrock(-18, 6, -1, 18, 6, 1, blocks.light),
  );
  for (const z of [-12, -4, 4, 12]) {
    addControlConsole(commands, -42, z, "blue_concrete", blocks);
    addControlConsole(commands, 42, z, "lime_concrete", blocks);
  }
  for (const x of [-54, -48, -36, -30]) {
    addBench(commands, x, 20, "x", "blue_concrete");
  }
  for (const x of [30, 36, 48, 54]) {
    addBench(commands, x, 20, "x", "lime_concrete");
  }
}

function addLaserMaze(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Attraction 1: laser maze",
    fillBedrock(25, 0, -68, 68, 0, -25, "white_concrete"),
    fillBedrock(25, 1, -68, 68, 4, -25, "black_concrete", "outline"),
    fillBedrock(32, 1, -62, 32, 3, -34, blocks.wall),
    fillBedrock(40, 1, -60, 40, 3, -28, blocks.wall),
    fillBedrock(48, 1, -68, 48, 3, -38, blocks.wall),
    fillBedrock(56, 1, -55, 56, 3, -25, blocks.wall),
    fillBedrock(28, 2, -58, 66, 2, -58, "red_stained_glass"),
    fillBedrock(28, 3, -48, 66, 3, -48, "red_stained_glass"),
    fillBedrock(28, 2, -38, 66, 2, -38, "red_stained_glass"),
    setBedrock(30, 1, -65, "gold_block"),
    setBedrock(64, 1, -29, "emerald_block"),
    setBedrock(46, 5, -46, blocks.light),
  );
  addStripedFloor(commands, 27, -66, 66, -27, "light_gray_concrete", "cyan_concrete");
  addLowFence(commands, 23, -70, 70, -23, "red_concrete", blocks.light);
  for (const z of [-64, -60, -56, -52, -48, -44, -40, -36, -32, -28]) {
    const y = z % 8 === 0 ? 3 : 2;
    commands.push(fillBedrock(29, y, z, 66, y, z, "red_stained_glass"));
  }
  for (const x of [34, 38, 42, 46, 50, 54, 58, 62]) {
    commands.push(
      setBedrock(x, 1, -65, "stone_pressure_plate"),
      setBedrock(x, 1, -29, "stone_pressure_plate"),
      setBedrock(x, 4, -65, blocks.light),
      setBedrock(x, 4, -29, blocks.light),
    );
  }
  addQueueMarkers(commands, 22, -47, 16, -47, "red_concrete", "yellow_concrete");
  addSpectatorStand(commands, 71, -66, 76, -31, "red_concrete", blocks);
}

function addCraterJump(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Attraction 2: crater jump",
    fillBedrock(-68, 0, -68, -25, 0, -25, "water"),
    fillBedrock(-68, 1, -68, -25, 2, -25, "gray_concrete", "outline"),
    setBedrock(-63, 1, -63, blocks.accentA),
    setBedrock(-58, 2, -60, blocks.accentB),
    setBedrock(-53, 2, -56, blocks.accentA),
    setBedrock(-49, 3, -50, blocks.accentB),
    setBedrock(-43, 3, -44, blocks.accentA),
    setBedrock(-37, 4, -38, blocks.accentB),
    fillBedrock(-32, 1, -33, -27, 1, -28, "diamond_block"),
    fillBedrock(-35, 2, -31, -29, 5, -31, blocks.glass),
    setBedrock(-31, 6, -31, blocks.light),
  );
  addLowFence(commands, -70, -70, -23, -23, "gray_concrete", blocks.light);
  for (const [x, z, h] of [
    [-64, -62, 1],
    [-60, -58, 2],
    [-56, -54, 2],
    [-52, -50, 3],
    [-48, -46, 3],
    [-44, -42, 4],
    [-40, -38, 4],
    [-36, -34, 5],
  ] as const) {
    commands.push(
      fillBedrock(x - 1, h, z - 1, x + 1, h, z + 1, h % 2 === 0 ? "cyan_concrete" : "lime_concrete"),
      setBedrock(x, h + 1, z, blocks.light),
    );
  }
  for (const [x, z] of [
    [-66, -35],
    [-60, -28],
    [-54, -66],
    [-45, -29],
    [-34, -62],
    [-29, -48],
  ] as const) {
    addMiniCrater(commands, x, z, "gray_concrete", "black_concrete");
  }
  addSpectatorStand(commands, -76, -67, -72, -29, "cyan_concrete", blocks);
  addQueueMarkers(commands, -22, -52, -12, -52, "cyan_concrete", "yellow_concrete");
}

function addCrystalCave(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Attraction 3: crystal cave",
    fillBedrock(-68, 0, 25, -25, 10, 68, "blackstone", "hollow"),
    fillBedrock(-66, 1, 27, -27, 1, 66, "deepslate"),
    fillBedrock(-66, 2, 27, -27, 4, 66, "air"),
    fillBedrock(-64, 0, 44, -28, 0, 48, "purple_concrete"),
    fillBedrock(-60, 1, 33, -58, 7, 35, "amethyst_block"),
    fillBedrock(-50, 1, 58, -48, 8, 60, "amethyst_block"),
    fillBedrock(-39, 1, 34, -37, 6, 36, "amethyst_block"),
    fillBedrock(-32, 1, 54, -30, 7, 56, "amethyst_block"),
    setBedrock(-47, 5, 47, blocks.light),
    setBedrock(-30, 1, 65, "emerald_block"),
  );
  addLowFence(commands, -70, 23, -23, 70, "purple_concrete", blocks.light);
  commands.push(
    fillBedrock(-69, 4, 30, -67, 12, 63, "blackstone"),
    fillBedrock(-26, 4, 30, -24, 12, 63, "blackstone"),
    fillBedrock(-69, 12, 30, -24, 14, 63, "blackstone"),
    fillBedrock(-52, 2, 25, -42, 7, 25, "glass"),
    fillBedrock(-51, 3, 25, -43, 5, 25, "air"),
  );
  for (const [x, z, h] of [
    [-62, 38, 8],
    [-58, 54, 5],
    [-54, 31, 6],
    [-50, 62, 9],
    [-44, 43, 7],
    [-41, 59, 5],
    [-36, 33, 8],
    [-31, 51, 6],
  ] as const) {
    addCrystalCluster(commands, x, z, h, "amethyst_block", blocks.light);
  }
  for (const z of [34, 38, 42, 46, 50, 54, 58, 62]) {
    commands.push(setBedrock(-46, 1, z, z % 4 === 0 ? "purple_concrete" : "cyan_concrete"));
  }
  addQueueMarkers(commands, -46, 22, -46, 14, "purple_concrete", "yellow_concrete");
}

function addRoverSpeedway(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Attraction 4: rover speedway",
    fillBedrock(25, 0, 25, 68, 0, 68, "green_concrete"),
    fillBedrock(29, 0, 29, 64, 0, 64, "black_concrete", "outline"),
    fillBedrock(33, 0, 33, 60, 0, 60, "gray_concrete", "outline"),
    fillBedrock(30, 1, 31, 63, 1, 31, "rail"),
    fillBedrock(63, 1, 31, 63, 1, 63, "rail"),
    fillBedrock(30, 1, 63, 63, 1, 63, "rail"),
    fillBedrock(30, 1, 31, 30, 1, 63, "rail"),
    fillBedrock(44, 0, 28, 50, 0, 34, "yellow_concrete"),
    setBedrock(47, 1, 31, "gold_block"),
    setBedrock(47, 2, 31, blocks.light),
    "summon minecart ~47 ~2 ~31",
  );
  addLowFence(commands, 23, 23, 70, 70, "black_concrete", blocks.light);
  commands.push(
    fillBedrock(31, 0, 31, 35, 0, 35, "white_concrete"),
    fillBedrock(36, 0, 31, 40, 0, 35, "black_concrete"),
    fillBedrock(41, 0, 31, 45, 0, 35, "white_concrete"),
    fillBedrock(46, 0, 31, 50, 0, 35, "black_concrete"),
    fillBedrock(51, 0, 31, 55, 0, 35, "white_concrete"),
    fillBedrock(56, 0, 31, 60, 0, 35, "black_concrete"),
  );
  for (const [x, z] of [
    [30, 30],
    [64, 30],
    [64, 64],
    [30, 64],
    [47, 30],
    [64, 47],
    [47, 64],
    [30, 47],
  ] as const) {
    commands.push(
      fillBedrock(x, 1, z, x, 5, z, "iron_block"),
      setBedrock(x, 6, z, blocks.light),
    );
  }
  addSpectatorStand(commands, 72, 29, 76, 62, "lime_concrete", blocks);
  addControlConsole(commands, 47, 24, "lime_concrete", blocks);
  addQueueMarkers(commands, 20, 47, 14, 47, "lime_concrete", "yellow_concrete");
}

function addFinalLaunch(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Final launch zone",
    fillBedrock(-18, 0, 42, 18, 0, 78, "white_concrete"),
    fillBedrock(-16, 1, 44, 16, 5, 76, blocks.wall, "outline"),
    fillBedrock(-4, 1, 58, 4, 20, 66, "white_concrete", "hollow"),
    fillBedrock(-2, 21, 60, 2, 25, 64, "red_concrete"),
    fillBedrock(-8, 1, 54, -5, 8, 57, "blue_concrete"),
    fillBedrock(5, 1, 54, 8, 8, 57, "lime_concrete"),
    fillBedrock(-4, 0, 67, 4, 0, 74, "orange_concrete"),
    fillBedrock(-2, 1, 68, 2, 4, 72, "yellow_concrete"),
    setBedrock(0, 1, 48, "diamond_block"),
    setBedrock(-8, 1, 48, "emerald_block"),
    setBedrock(8, 1, 48, "gold_block"),
    setBedrock(0, 26, 62, blocks.light),
  );
  addLowFence(commands, -22, 38, 22, 80, "orange_concrete", blocks.light);
  commands.push(
    fillBedrock(-14, 1, 52, -14, 18, 74, "iron_block"),
    fillBedrock(14, 1, 52, 14, 18, 74, "iron_block"),
    fillBedrock(-14, 8, 52, 14, 8, 74, "iron_block"),
    fillBedrock(-14, 14, 52, 14, 14, 74, "iron_block"),
    fillBedrock(-13, 18, 55, 13, 18, 71, blocks.light),
    fillBedrock(-10, 0, 42, 10, 0, 50, "black_concrete"),
    fillBedrock(-8, 1, 42, 8, 1, 50, "red_concrete"),
  );
  for (const x of [-16, -8, 0, 8, 16]) {
    commands.push(setBedrock(x, 1, 40, "gold_block"), setBedrock(x, 2, 40, blocks.light));
  }
  addSpectatorStand(commands, -20, 82, 20, 86, "orange_concrete", blocks);
  addControlConsole(commands, -12, 46, "red_concrete", blocks);
  addControlConsole(commands, 12, 46, "lime_concrete", blocks);
  addQueueMarkers(commands, 0, 36, 0, 24, "orange_concrete", "yellow_concrete");
}

function addThemeParkPaths(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Main roads and perimeter");
  fillTiledBedrock(commands, -112, -1, -112, 112, -1, 112, blocks.floor);
  fillTiledBedrock(commands, -112, 0, -112, 112, 0, 112, "light_gray_concrete");
  commands.push(
    fillBedrock(-7, 0, -108, 7, 0, 108, blocks.accentA),
    fillBedrock(-108, 0, -7, 108, 0, 7, blocks.accentA),
    fillBedrock(-112, 1, -112, 112, 5, -112, "black_concrete"),
    fillBedrock(-112, 1, 112, 112, 5, 112, "black_concrete"),
    fillBedrock(-112, 1, -112, -112, 5, 112, "black_concrete"),
    fillBedrock(112, 1, -112, 112, 5, 112, "black_concrete"),
    fillBedrock(-5, 1, -112, 5, 5, -112, "air"),
    fillBedrock(-104, 0, -104, -96, 0, -96, "gray_concrete"),
    fillBedrock(96, 0, -104, 104, 0, -96, "gray_concrete"),
    fillBedrock(-104, 0, 96, -96, 0, 104, "gray_concrete"),
    fillBedrock(96, 0, 96, 104, 0, 104, "gray_concrete"),
  );
  addLampGrid(commands, blocks.light);
}

function addParkWideDecor(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Park-wide decoration, route markers, and child-safe visual anchors");

  for (const z of [-64, -56, -48, -40, -32, -24, -16, -8, 8, 16, 24, 32, 40, 48, 56, 64]) {
    commands.push(setBedrock(-6, 1, z, "yellow_concrete"), setBedrock(6, 1, z, "yellow_concrete"));
  }
  for (const x of [-64, -56, -48, -40, -32, -24, -16, -8, 8, 16, 24, 32, 40, 48, 56, 64]) {
    commands.push(setBedrock(x, 1, -6, "yellow_concrete"), setBedrock(x, 1, 6, "yellow_concrete"));
  }

  for (const [x, z] of [
    [-72, -72],
    [-62, -16],
    [-72, 14],
    [-18, -72],
    [18, -72],
    [72, -72],
    [72, -14],
    [72, 16],
    [-72, 72],
    [-16, 72],
    [16, 72],
    [72, 72],
  ] as const) {
    addMiniCrater(commands, x, z, "gray_concrete", "light_gray_concrete");
  }

  for (const [x, z, color] of [
    [-70, 0, "blue_concrete"],
    [70, 0, "lime_concrete"],
    [0, -70, "cyan_concrete"],
    [0, 70, "orange_concrete"],
    [-70, -70, "yellow_concrete"],
    [70, -70, "red_concrete"],
    [-70, 70, "purple_concrete"],
    [70, 70, "green_concrete"],
  ] as const) {
    addFlagPole(commands, x, z, color, blocks.light);
  }

  for (const [x, z, facing, color] of [
    [-12, -30, "x", "cyan_concrete"],
    [12, -30, "x", "lime_concrete"],
    [-12, 30, "x", "cyan_concrete"],
    [12, 30, "x", "lime_concrete"],
    [-30, -12, "z", "blue_concrete"],
    [-30, 12, "z", "blue_concrete"],
    [30, -12, "z", "lime_concrete"],
    [30, 12, "z", "lime_concrete"],
  ] as const) {
    addBench(commands, x, z, facing, color);
  }

  for (const [x, z, color] of [
    [-17, -17, "diamond_block"],
    [17, -17, "emerald_block"],
    [-17, 17, "gold_block"],
    [17, 17, "amethyst_block"],
  ] as const) {
    commands.push(
      fillBedrock(x - 2, 1, z - 2, x + 2, 2, z + 2, color, "hollow"),
      setBedrock(x, 3, z, blocks.light),
    );
  }
}

function addTieredTower(commands: string[], x: number, z: number, color: string, blocks: MinecraftBlockSet, height = 24): void {
  commands.push(
    fillBedrock(x - 5, 1, z - 5, x + 5, height, z + 5, blocks.wall, "hollow"),
    fillBedrock(x - 4, 1, z - 6, x + 4, 5, z - 6, blocks.glass),
    fillBedrock(x - 4, 1, z + 6, x + 4, 5, z + 6, blocks.glass),
    fillBedrock(x - 6, 1, z - 4, x - 6, 5, z + 4, blocks.glass),
    fillBedrock(x + 6, 1, z - 4, x + 6, 5, z + 4, blocks.glass),
    fillBedrock(x - 6, height + 1, z - 6, x + 6, height + 2, z + 6, color),
    fillBedrock(x - 4, height + 3, z - 4, x + 4, height + 6, z + 4, color, "hollow"),
    setBedrock(x, height + 7, z, blocks.light),
  );
  addFlagPole(commands, x, z - 7, color, blocks.light);
}

function addLayeredDome(commands: string[], x: number, z: number, baseY: number, radius: number, color: string, light: string): void {
  for (let layer = 0; layer < 7; layer += 1) {
    const r = Math.max(1, radius - layer * 2);
    commands.push(fillBedrock(x - r, baseY + layer, z - r, x + r, baseY + layer, z + r, layer % 2 === 0 ? color : "glass"));
  }
  commands.push(setBedrock(x, baseY + 7, z, light));
}

function addGlowPylon(commands: string[], x: number, z: number, height: number, color: string, light: string): void {
  commands.push(fillBedrock(x, 1, z, x, height, z, "iron_block"));
  for (let y = 4; y <= height; y += 4) {
    commands.push(setBedrock(x, y, z, y % 8 === 0 ? color : light));
  }
}

function addFloorArrow(commands: string[], x: number, z: number, direction: "north" | "south" | "east" | "west", color: string): void {
  if (direction === "north") {
    commands.push(
      fillBedrock(x, 0, z - 5, x, 0, z + 5, color),
      fillBedrock(x - 3, 0, z - 5, x + 3, 0, z - 5, color),
      fillBedrock(x - 2, 0, z - 7, x + 2, 0, z - 6, color),
    );
  } else if (direction === "south") {
    commands.push(
      fillBedrock(x, 0, z - 5, x, 0, z + 5, color),
      fillBedrock(x - 3, 0, z + 5, x + 3, 0, z + 5, color),
      fillBedrock(x - 2, 0, z + 6, x + 2, 0, z + 7, color),
    );
  } else if (direction === "east") {
    commands.push(
      fillBedrock(x - 5, 0, z, x + 5, 0, z, color),
      fillBedrock(x + 5, 0, z - 3, x + 5, 0, z + 3, color),
      fillBedrock(x + 6, 0, z - 2, x + 7, 0, z + 2, color),
    );
  } else {
    commands.push(
      fillBedrock(x - 5, 0, z, x + 5, 0, z, color),
      fillBedrock(x - 5, 0, z - 3, x - 5, 0, z + 3, color),
      fillBedrock(x - 7, 0, z - 2, x - 6, 0, z + 2, color),
    );
  }
}

function addMoonSurfaceTexture(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final surface texture: moon dust, route dots, and dense floor detail");
  for (let x = -108; x <= 108; x += 7) {
    for (let z = -108; z <= 108; z += 7) {
      if (Math.abs(x) <= 9 || Math.abs(z) <= 9) continue;
      const selector = Math.abs((x * 17 + z * 31) % 5);
      const block = selector === 0 ? "white_concrete" : selector === 1 ? "gray_concrete" : selector === 2 ? blocks.floor : "light_gray_concrete";
      commands.push(setBedrock(x, 0, z, block));
    }
  }

  for (const [x, z, direction, color] of [
    [0, -96, "north", "yellow_concrete"],
    [0, -62, "north", "yellow_concrete"],
    [0, -28, "north", "yellow_concrete"],
    [-32, 0, "west", "cyan_concrete"],
    [-70, 0, "west", "cyan_concrete"],
    [32, 0, "east", "lime_concrete"],
    [70, 0, "east", "lime_concrete"],
    [0, 34, "south", "orange_concrete"],
    [0, 72, "south", "orange_concrete"],
  ] as const) {
    addFloorArrow(commands, x, z, direction, color);
  }
}

function addFinalEntranceFacade(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: grand outer entrance facade and arrival plaza");
  commands.push(
    fillBedrock(-70, 0, -112, 70, 0, -84, "black_concrete"),
    fillBedrock(-66, 0, -108, 66, 0, -88, "cyan_concrete"),
    fillBedrock(-58, 1, -106, 58, 22, -102, blocks.wall),
    fillBedrock(-24, 1, -107, 24, 17, -101, "air"),
    fillBedrock(-52, 18, -107, 52, 25, -101, blocks.wall),
    fillBedrock(-18, 18, -108, 18, 23, -108, blocks.glass),
    fillBedrock(-20, 0, -100, 20, 0, -82, "yellow_concrete"),
    fillBedrock(-12, 1, -99, 12, 12, -95, "glass", "hollow"),
    fillBedrock(-9, 1, -94, 9, 10, -88, "glass", "hollow"),
    fillBedrock(-54, 26, -105, 54, 27, -105, blocks.light),
    ...drawPixelText("MOON PARK", -24, 29, -106, "yellow_concrete"),
  );

  for (const [x, z, color, height] of [
    [-64, -102, "cyan_concrete", 28],
    [-46, -102, "blue_concrete", 24],
    [46, -102, "lime_concrete", 24],
    [64, -102, "yellow_concrete", 28],
    [-78, -92, "orange_concrete", 22],
    [78, -92, "red_concrete", 22],
  ] as const) {
    addTieredTower(commands, x, z, color, blocks, height);
  }

  for (const x of [-56, -44, -32, 32, 44, 56]) {
    addTicketBooth(commands, x, -86, x < 0 ? "cyan_concrete" : "lime_concrete", blocks);
  }
  for (const x of [-48, -32, -16, 16, 32, 48]) {
    addBench(commands, x, -92, "x", x < 0 ? "blue_concrete" : "lime_concrete");
  }
}

function addPerimeterSkyline(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: perimeter skyline towers and moon ridge");
  for (const [x, z, color, height] of [
    [-104, -104, "cyan_concrete", 26],
    [104, -104, "lime_concrete", 26],
    [-104, 104, "purple_concrete", 24],
    [104, 104, "orange_concrete", 24],
    [-104, 0, "blue_concrete", 22],
    [104, 0, "lime_concrete", 22],
    [0, 104, "red_concrete", 22],
  ] as const) {
    addTieredTower(commands, x, z, color, blocks, height);
  }

  for (let x = -96; x <= 96; x += 16) {
    commands.push(
      fillBedrock(x - 4, 1, 108, x + 4, 6 + Math.abs(x % 32) / 8, 110, "gray_concrete"),
      setBedrock(x, 8, 109, blocks.light),
    );
  }
  for (let z = -96; z <= 96; z += 16) {
    commands.push(
      fillBedrock(-110, 1, z - 4, -108, 6 + Math.abs(z % 32) / 8, z + 4, "gray_concrete"),
      fillBedrock(108, 1, z - 4, 110, 6 + Math.abs(z % 32) / 8, z + 4, "gray_concrete"),
    );
  }
}

function addMegaRocketComplex(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: giant launch complex, gantry, and hero rocket");
  commands.push(
    fillBedrock(-36, 0, -36, 36, 0, 36, "black_concrete"),
    fillBedrock(-32, 0, -32, 32, 0, 32, "white_concrete"),
    fillBedrock(-28, 0, -28, 28, 0, 28, "cyan_concrete", "outline"),
    fillBedrock(-18, 0, -18, 18, 0, 18, "yellow_concrete", "outline"),
    fillBedrock(-4, 1, -4, 4, 34, 4, "white_concrete"),
    fillBedrock(-3, 35, -3, 3, 40, 3, "red_concrete"),
    fillBedrock(-2, 41, -2, 2, 45, 2, "red_concrete"),
    fillBedrock(-6, 4, -6, -4, 14, -4, "cyan_concrete"),
    fillBedrock(4, 4, -6, 6, 14, -4, "lime_concrete"),
    fillBedrock(-6, 4, 4, -4, 14, 6, "cyan_concrete"),
    fillBedrock(4, 4, 4, 6, 14, 6, "lime_concrete"),
    fillBedrock(-6, 0, 7, 6, 0, 16, "orange_concrete"),
    fillBedrock(-4, 1, 9, 4, 7, 15, "yellow_concrete"),
    setBedrock(0, 46, 0, blocks.light),
  );

  for (const [x, z] of [
    [-24, -24],
    [24, -24],
    [-24, 24],
    [24, 24],
  ] as const) {
    addGlowPylon(commands, x, z, 34, "cyan_concrete", blocks.light);
    commands.push(
      fillBedrock(Math.min(x, 0), 12, z, Math.max(x, 0), 12, z, "iron_block"),
      fillBedrock(x, 20, Math.min(z, 0), x, 20, Math.max(z, 0), "iron_block"),
      fillBedrock(x - 2, 30, z - 2, x + 2, 31, z + 2, blocks.light),
    );
  }

  for (let r = 10; r <= 34; r += 6) {
    commands.push(
      fillBedrock(-r, 1, -r, r, 1, -r, blocks.light),
      fillBedrock(-r, 1, r, r, 1, r, blocks.light),
      fillBedrock(-r, 1, -r, -r, 1, r, blocks.light),
      fillBedrock(r, 1, -r, r, 1, r, blocks.light),
    );
  }
}

function addFinalDuoHqDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: hero duo headquarters domes and sky bridge");
  addLayeredDome(commands, -42, 0, 8, 15, "blue_concrete", blocks.light);
  addLayeredDome(commands, 42, 0, 8, 15, "lime_concrete", blocks.light);
  commands.push(
    fillBedrock(-26, 10, -5, 26, 12, 5, "glass", "hollow"),
    fillBedrock(-26, 13, -3, 26, 13, 3, blocks.light),
    fillBedrock(-60, 1, -24, -24, 14, -22, "blue_concrete"),
    fillBedrock(24, 1, -24, 60, 14, -22, "lime_concrete"),
    fillBedrock(-55, 15, -24, -29, 16, -22, blocks.light),
    fillBedrock(29, 15, -24, 55, 16, -22, blocks.light),
  );
  for (const z of [-18, -10, -2, 6, 14]) {
    addGlowPylon(commands, -64, z, 15, "blue_concrete", blocks.light);
    addGlowPylon(commands, 64, z, 15, "lime_concrete", blocks.light);
  }
}

function addFinalLaserDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: laser dome, prism tower, and denser maze spectacle");
  commands.push(
    fillBedrock(22, 5, -72, 72, 5, -22, "red_stained_glass", "outline"),
    fillBedrock(24, 8, -70, 70, 8, -24, "glass", "outline"),
    fillBedrock(44, 1, -47, 50, 26, -41, "black_concrete", "hollow"),
    fillBedrock(45, 27, -46, 49, 31, -42, "red_concrete"),
    setBedrock(47, 32, -44, blocks.light),
  );
  for (let z = -68; z <= -26; z += 6) {
    commands.push(
      fillBedrock(24, 6, z, 70, 6, z, "red_stained_glass"),
      fillBedrock(24, 10, z + 2, 70, 10, z + 2, "red_stained_glass"),
    );
  }
  for (let x = 28; x <= 68; x += 8) {
    addGlowPylon(commands, x, -72, 12, "red_concrete", blocks.light);
    addGlowPylon(commands, x, -22, 12, "red_concrete", blocks.light);
  }
}

function addFinalCraterDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: crater amphitheater, floating asteroids, and landing pads");
  commands.push(
    fillBedrock(-72, 1, -72, -22, 6, -70, "gray_concrete"),
    fillBedrock(-72, 1, -24, -22, 6, -22, "gray_concrete"),
    fillBedrock(-72, 1, -72, -70, 6, -22, "gray_concrete"),
    fillBedrock(-24, 1, -72, -22, 6, -22, "gray_concrete"),
    fillBedrock(-64, 7, -67, -30, 9, -67, "glass"),
    fillBedrock(-66, 7, -29, -32, 9, -29, "glass"),
  );
  for (const [x, z, y, color] of [
    [-66, -66, 13, "gray_concrete"],
    [-58, -40, 18, "light_gray_concrete"],
    [-50, -62, 16, "white_concrete"],
    [-38, -34, 20, "gray_concrete"],
    [-28, -58, 15, "light_gray_concrete"],
  ] as const) {
    commands.push(
      fillBedrock(x - 3, y, z - 2, x + 3, y + 2, z + 2, color),
      setBedrock(x, y + 3, z, blocks.light),
    );
  }
  for (const [x, z] of [
    [-63, -48],
    [-56, -35],
    [-44, -60],
    [-34, -46],
  ] as const) {
    commands.push(fillBedrock(x - 3, 1, z - 3, x + 3, 1, z + 3, "slime_block"));
  }
}

function addFinalCrystalDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: crystal mountain facade and glowing cave ceiling");
  commands.push(
    fillBedrock(-74, 1, 22, -20, 16, 24, "blackstone"),
    fillBedrock(-74, 1, 66, -20, 18, 70, "blackstone"),
    fillBedrock(-74, 12, 24, -20, 20, 68, "blackstone", "outline"),
    fillBedrock(-58, 2, 22, -36, 12, 22, "glass"),
    fillBedrock(-54, 3, 22, -40, 9, 22, "air"),
  );
  for (let x = -68; x <= -24; x += 8) {
    for (let z = 30; z <= 64; z += 10) {
      addCrystalCluster(commands, x, z, 5 + Math.abs((x + z) % 7), "amethyst_block", blocks.light);
    }
  }
  for (let x = -66; x <= -28; x += 6) {
    commands.push(setBedrock(x, 12, 28, blocks.light), setBedrock(x, 14, 66, blocks.light));
  }
}

function addFinalRoverDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: rover garage, raised track, and pit lane");
  commands.push(
    fillBedrock(22, 1, 70, 72, 12, 74, "black_concrete", "hollow"),
    fillBedrock(28, 2, 69, 66, 8, 69, "glass"),
    fillBedrock(34, 13, 70, 60, 16, 74, "lime_concrete"),
    fillBedrock(24, 0, 72, 70, 0, 84, "yellow_concrete"),
    fillBedrock(28, 1, 76, 66, 1, 82, "rail"),
  );
  for (let x = 28; x <= 66; x += 6) {
    commands.push(
      fillBedrock(x, 1, 76, x, 4, 76, "iron_block"),
      fillBedrock(x, 1, 82, x, 4, 82, "iron_block"),
      setBedrock(x, 5, 76, blocks.light),
      setBedrock(x, 5, 82, blocks.light),
    );
  }
  for (const [x, z] of [
    [24, 24],
    [70, 24],
    [70, 70],
    [24, 70],
  ] as const) {
    commands.push(fillBedrock(x, 8, z, x, 9, z, blocks.light));
  }
}

function addFinalLaunchDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: finale stage, launch gantries, and celebration platform");
  commands.push(
    fillBedrock(-30, 0, 38, 30, 0, 104, "black_concrete"),
    fillBedrock(-24, 0, 42, 24, 0, 98, "white_concrete"),
    fillBedrock(-18, 1, 88, 18, 12, 100, "orange_concrete", "hollow"),
    fillBedrock(-14, 2, 87, 14, 8, 87, "glass"),
    fillBedrock(-26, 1, 42, -24, 30, 96, "iron_block"),
    fillBedrock(24, 1, 42, 26, 30, 96, "iron_block"),
    fillBedrock(-26, 18, 42, 26, 18, 96, "iron_block"),
    fillBedrock(-26, 28, 42, 26, 28, 96, blocks.light),
  );
  for (let x = -20; x <= 20; x += 10) {
    commands.push(
      fillBedrock(x - 2, 1, 92, x + 2, 3, 96, x === 0 ? "diamond_block" : "gold_block"),
      setBedrock(x, 4, 94, blocks.light),
    );
  }
  addLayeredDome(commands, 0, 96, 13, 12, "orange_concrete", blocks.light);
}

function addOrbitalRail(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: elevated orbital rail around the rocket plaza");
  commands.push(
    fillBedrock(-62, 10, -62, 62, 10, -62, "rail"),
    fillBedrock(62, 10, -62, 62, 10, 62, "rail"),
    fillBedrock(-62, 10, 62, 62, 10, 62, "rail"),
    fillBedrock(-62, 10, -62, -62, 10, 62, "rail"),
    fillBedrock(-12, 9, -68, 12, 12, -62, "cyan_concrete", "hollow"),
    fillBedrock(-12, 9, 62, 12, 12, 68, "lime_concrete", "hollow"),
  );
  for (let x = -60; x <= 60; x += 12) {
    addGlowPylon(commands, x, -62, 10, "cyan_concrete", blocks.light);
    addGlowPylon(commands, x, 62, 10, "lime_concrete", blocks.light);
  }
  for (let z = -48; z <= 48; z += 12) {
    addGlowPylon(commands, -62, z, 10, "blue_concrete", blocks.light);
    addGlowPylon(commands, 62, z, 10, "lime_concrete", blocks.light);
  }
  commands.push("summon minecart ~0 ~11 ~-62");
}

function addCheckpointTrail(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: visible child-friendly checkpoint trail");
  for (const [x, z, color, reward] of [
    [0, -84, "yellow_concrete", "gold_block"],
    [0, -18, "cyan_concrete", "diamond_block"],
    [-52, -52, "cyan_concrete", "diamond_block"],
    [52, -52, "red_concrete", "emerald_block"],
    [-52, 52, "purple_concrete", "amethyst_block"],
    [52, 52, "lime_concrete", "emerald_block"],
    [0, 88, "orange_concrete", "gold_block"],
  ] as const) {
    commands.push(
      fillBedrock(x - 4, 1, z - 4, x + 4, 1, z + 4, color),
      fillBedrock(x - 2, 2, z - 2, x + 2, 3, z + 2, reward),
      setBedrock(x, 4, z, blocks.light),
    );
  }
}

function addFinalSkyDetails(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Final edition: starlight canopy over the park");
  for (let x = -96; x <= 96; x += 16) {
    for (let z = -96; z <= 96; z += 16) {
      if (Math.abs(x) < 20 && Math.abs(z) < 20) continue;
      const y = 18 + Math.abs((x + z) % 12);
      commands.push(setBedrock(x, y, z, blocks.light));
      if ((x + z) % 32 === 0) {
        commands.push(setBedrock(x + 1, y, z, "yellow_concrete"), setBedrock(x - 1, y, z, "yellow_concrete"));
      }
    }
  }
}

function addPosterMoonTerrain(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Poster edition: grey moon terrain shaped for the preview view");
  fillTiledBedrock(commands, -120, -1, -126, 120, -1, 116, "stone");
  fillTiledBedrock(commands, -116, 0, -122, 116, 0, 112, "gray_concrete");

  for (let ring = 0; ring < 8; ring += 1) {
    const inset = ring * 9;
    const block = ring % 2 === 0 ? "light_gray_concrete" : "stone";
    commands.push(
      fillBedrock(-112 + inset, 1 + Math.floor(ring / 2), -118 + inset, 112 - inset, 1 + Math.floor(ring / 2), -112 + inset, block),
      fillBedrock(-112 + inset, 1 + Math.floor(ring / 2), 104 - inset, 112 - inset, 1 + Math.floor(ring / 2), 110 - inset, block),
      fillBedrock(-112 + inset, 1 + Math.floor(ring / 2), -112 + inset, -106 + inset, 1 + Math.floor(ring / 2), 104 - inset, block),
      fillBedrock(106 - inset, 1 + Math.floor(ring / 2), -112 + inset, 112 - inset, 1 + Math.floor(ring / 2), 104 - inset, block),
    );
  }

  for (const [x, z, radius, height] of [
    [-78, -44, 18, 5],
    [-82, 42, 22, 6],
    [76, -42, 18, 5],
    [78, 42, 24, 6],
    [-18, -18, 24, 4],
    [18, -18, 24, 4],
    [0, 58, 28, 5],
  ] as const) {
    for (let level = 0; level < height; level += 1) {
      const r = radius - level * 3;
      commands.push(fillBedrock(x - r, level + 1, z - r, x + r, level + 1, z + r, level % 2 === 0 ? "stone" : "gray_concrete"));
    }
  }

  for (const [x, z] of [
    [-106, -80],
    [-98, 28],
    [-88, 84],
    [-62, -98],
    [-42, 72],
    [-16, -76],
    [32, 82],
    [58, -92],
    [88, -68],
    [102, 16],
  ] as const) {
    addMiniCrater(commands, x, z, "light_gray_concrete", "black_concrete");
  }

  commands.push(
    fillBedrock(-8, 1, -116, 8, 1, 92, "cyan_concrete"),
    fillBedrock(-4, 2, -116, 4, 2, 92, "white_concrete"),
    fillBedrock(-108, 1, -8, 108, 1, 8, "cyan_concrete"),
    fillBedrock(-108, 2, -4, 108, 2, 4, "white_concrete"),
  );

  for (let z = -112; z <= 84; z += 14) {
    commands.push(setBedrock(-10, 2, z, blocks.light), setBedrock(10, 2, z, blocks.light));
  }
  for (let x = -98; x <= 98; x += 14) {
    commands.push(setBedrock(x, 2, -10, blocks.light), setBedrock(x, 2, 10, blocks.light));
  }
}

function addPosterGate(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Poster edition: close foreground MOON PARK gate");
  commands.push(
    fillBedrock(-68, 1, -124, 68, 8, -120, "stone"),
    fillBedrock(-64, 9, -124, 64, 12, -120, "white_concrete"),
    fillBedrock(-56, 13, -125, 56, 23, -121, "cyan_concrete"),
    fillBedrock(-54, 14, -126, 54, 22, -126, "cyan_concrete"),
    ...drawPixelText("MOON PARK", -27, 16, -127, "white_concrete"),
    fillBedrock(-78, 1, -126, -58, 24, -118, "white_concrete"),
    fillBedrock(58, 1, -126, 78, 24, -118, "white_concrete"),
    fillBedrock(-74, 2, -127, -62, 20, -127, "stone"),
    fillBedrock(62, 2, -127, 74, 20, -127, "stone"),
    fillBedrock(-71, 4, -128, -65, 17, -128, "cyan_concrete"),
    fillBedrock(65, 4, -128, 71, 17, -128, "cyan_concrete"),
    fillBedrock(-82, 25, -126, -54, 27, -118, "white_concrete"),
    fillBedrock(54, 25, -126, 82, 27, -118, "white_concrete"),
    fillBedrock(-88, 1, -122, 88, 4, -112, "stone"),
    fillBedrock(-84, 5, -121, 84, 5, -113, "white_concrete"),
  );

  for (const x of [-78, -58, 58, 78]) {
    commands.push(setBedrock(x, 28, -122, blocks.light));
  }
  addFlagPole(commands, -91, -119, "blue_concrete", blocks.light);
  addFlagPole(commands, 87, -119, "lime_concrete", blocks.light);
}

function addPosterRocket(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Poster edition: tapered central rocket matching the concept composition");
  commands.push(
    fillBedrock(-28, 1, -28, 28, 5, 28, "stone"),
    fillBedrock(-24, 6, -24, 24, 8, 24, "white_concrete"),
    fillBedrock(-18, 9, -18, 18, 10, 18, "cyan_concrete"),
    fillBedrock(-13, 1, -13, 13, 2, 13, "black_concrete"),
  );

  for (let y = 3; y <= 42; y += 4) {
    const r = y < 12 ? 8 : y < 24 ? 6 : y < 34 ? 4 : 3;
    commands.push(fillBedrock(-r, y, -r, r, y + 3, r, "white_concrete"));
  }
  commands.push(
    fillBedrock(-2, 43, -2, 2, 49, 2, "orange_concrete"),
    setBedrock(0, 50, 0, blocks.light),
    fillBedrock(-3, 15, -9, 3, 24, -9, "cyan_concrete"),
    fillBedrock(-3, 15, 9, 3, 24, 9, "cyan_concrete"),
    fillBedrock(-9, 15, -3, -9, 24, 3, "cyan_concrete"),
    fillBedrock(9, 15, -3, 9, 24, 3, "cyan_concrete"),
    fillBedrock(-15, 1, -15, -8, 18, -8, "white_concrete"),
    fillBedrock(8, 1, -15, 15, 18, -8, "white_concrete"),
    fillBedrock(-15, 1, 8, -8, 18, 15, "white_concrete"),
    fillBedrock(8, 1, 8, 15, 18, 15, "white_concrete"),
    fillBedrock(-20, 1, 14, 20, 8, 24, "orange_concrete"),
    fillBedrock(-14, 2, 16, 14, 12, 26, "yellow_concrete"),
  );

  for (const [x, z] of [
    [-34, -34],
    [34, -34],
    [-34, 34],
    [34, 34],
  ] as const) {
    addGlowPylon(commands, x, z, 34, "cyan_concrete", blocks.light);
  }
  commands.push(
    fillBedrock(20, 1, -24, 24, 36, -20, "iron_block"),
    fillBedrock(26, 1, -24, 30, 36, -20, "iron_block"),
    fillBedrock(20, 12, -24, 30, 14, -20, "iron_block"),
    fillBedrock(20, 24, -24, 30, 26, -20, "iron_block"),
    fillBedrock(20, 36, -24, 30, 38, -20, blocks.light),
  );
}

function addPosterAttractions(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Poster edition: visible labeled attractions");
  commands.push(
    fillBedrock(-106, 1, -38, -72, 11, 8, "blue_concrete"),
    fillBedrock(-106, 12, -38, -72, 22, 8, "blue_concrete"),
    fillBedrock(-103, 2, -39, -75, 20, -39, "white_concrete"),
    fillBedrock(-100, 5, -40, -78, 15, -40, "blue_concrete"),
    ...drawPixelText("BLUE HQ", -101, 11, -41, "white_concrete"),
    fillBedrock(72, 1, -38, 106, 11, 8, "lime_concrete"),
    fillBedrock(72, 12, -38, 106, 22, 8, "lime_concrete"),
    fillBedrock(75, 2, -39, 103, 20, -39, "white_concrete"),
    fillBedrock(78, 5, -40, 100, 15, -40, "lime_concrete"),
    ...drawPixelText("GREEN HQ", 74, 11, -41, "white_concrete"),
    fillBedrock(38, 1, -86, 86, 12, -48, "red_stained_glass", "hollow"),
    fillBedrock(40, 13, -88, 84, 17, -88, "black_concrete"),
    ...drawPixelText("LASER", 46, 14, -89, "white_concrete"),
    fillBedrock(42, 1, 38, 96, 1, 92, "black_concrete", "outline"),
    fillBedrock(48, 1, 44, 90, 1, 86, "gray_concrete", "outline"),
    fillBedrock(54, 1, 50, 84, 1, 80, "black_concrete", "outline"),
    fillBedrock(42, 2, 36, 96, 6, 36, "black_concrete"),
    ...drawPixelText("ROVER", 50, 4, 35, "white_concrete"),
    fillBedrock(-104, 1, 44, -56, 18, 44, "blackstone"),
    fillBedrock(-104, 1, 96, -56, 18, 96, "blackstone"),
    fillBedrock(-104, 1, 44, -104, 18, 96, "blackstone"),
    fillBedrock(-56, 1, 44, -56, 18, 96, "blackstone"),
    fillBedrock(-104, 18, 44, -56, 18, 96, "blackstone"),
    fillBedrock(-102, 1, 46, -58, 1, 94, "deepslate"),
    fillBedrock(-100, 2, 42, -60, 10, 42, "purple_concrete"),
    ...drawPixelText("CRYSTAL", -100, 5, 41, "white_concrete"),
  );

  for (const [x, z, h] of [
    [-98, 64, 12],
    [-90, 82, 9],
    [-78, 58, 14],
    [-70, 88, 10],
    [-62, 70, 13],
  ] as const) {
    addCrystalCluster(commands, x, z, h, "amethyst_block", blocks.light);
  }
}

function addV5MoonRidge(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Visual v5: terraced grey moon ridge and cratered theme-park basin");

  for (let layer = 0; layer < 7; layer += 1) {
    const inset = layer * 5;
    const y = 1 + layer;
    const block = layer % 3 === 0 ? "stone" : layer % 3 === 1 ? "gray_concrete" : "light_gray_concrete";
    commands.push(
      fillBedrock(-120 + inset, y, 104 + layer, 120 - inset, y + 1, 116, block),
      fillBedrock(-120, y, -104 + inset, -108 - layer, y + 1, 104 - inset, block),
      fillBedrock(108 + layer, y, -104 + inset, 120, y + 1, 104 - inset, block),
    );
  }

  for (let x = -112; x <= 112; x += 8) {
    const height = 4 + Math.abs((x * 13) % 9);
    const block = x % 16 === 0 ? "light_gray_concrete" : "stone";
    commands.push(fillBedrock(x - 3, 1, 107, x + 3, height, 116, block));
  }
  for (let z = -96; z <= 96; z += 12) {
    const leftHeight = 3 + Math.abs((z * 11) % 7);
    const rightHeight = 4 + Math.abs((z * 7) % 6);
    commands.push(
      fillBedrock(-120, 1, z - 4, -110, leftHeight, z + 4, z % 24 === 0 ? "gray_concrete" : "stone"),
      fillBedrock(110, 1, z - 4, 120, rightHeight, z + 4, z % 24 === 0 ? "light_gray_concrete" : "gray_concrete"),
    );
  }

  for (const [x, z, radius] of [
    [-92, -72, 12],
    [-72, 76, 18],
    [-36, -48, 14],
    [36, -52, 15],
    [78, 74, 19],
    [96, -74, 12],
  ] as const) {
    for (let ring = 0; ring < 4; ring += 1) {
      const r = radius - ring * 3;
      const block = ring % 2 === 0 ? "gray_concrete" : "light_gray_concrete";
      commands.push(
        fillBedrock(x - r, ring + 1, z - r, x + r, ring + 1, z - r, block),
        fillBedrock(x - r, ring + 1, z + r, x + r, ring + 1, z + r, block),
        fillBedrock(x - r, ring + 1, z - r, x - r, ring + 1, z + r, block),
        fillBedrock(x + r, ring + 1, z - r, x + r, ring + 1, z + r, block),
      );
    }
    commands.push(fillBedrock(x - 3, 1, z - 3, x + 3, 1, z + 3, "black_concrete"));
  }

  for (let z = -116; z <= 96; z += 8) {
    commands.push(
      fillBedrock(-13, 1, z, -11, 2, z + 2, blocks.light),
      fillBedrock(11, 1, z, 13, 2, z + 2, blocks.light),
    );
  }
}

function addV5HeroGate(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Visual v5: hero MOON PARK gate with stone trim, cyan signboard, and foreground scale");
  commands.push(
    fillBedrock(-92, 1, -132, 92, 4, -116, "stone"),
    fillBedrock(-86, 5, -130, 86, 6, -118, "light_gray_concrete"),
    fillBedrock(-78, 7, -131, -58, 32, -117, "white_concrete"),
    fillBedrock(58, 7, -131, 78, 32, -117, "white_concrete"),
    fillBedrock(-73, 10, -132, -63, 28, -132, "cyan_concrete"),
    fillBedrock(63, 10, -132, 73, 28, -132, "cyan_concrete"),
    fillBedrock(-82, 33, -130, -54, 36, -118, "light_gray_concrete"),
    fillBedrock(54, 33, -130, 82, 36, -118, "light_gray_concrete"),
    fillBedrock(-63, 24, -130, 63, 31, -118, "white_concrete"),
    fillBedrock(-57, 25, -132, 57, 35, -132, "cyan_concrete"),
    fillBedrock(-54, 26, -133, 54, 34, -133, "cyan_concrete"),
    ...drawPixelTextMirrored("MOON PARK", -27, 28, -134, "white_concrete"),
    fillBedrock(-62, 9, -136, 62, 20, -136, "cyan_concrete"),
    fillBedrock(-66, 8, -135, 66, 8, -135, "white_concrete"),
    fillBedrock(-66, 21, -135, 66, 21, -135, "white_concrete"),
    ...drawPixelTextMirrored("MOON PARK", -27, 12, -137, "white_concrete"),
    fillBedrock(-36, 13, -80, 36, 24, -80, "cyan_concrete"),
    fillBedrock(-40, 12, -79, 40, 12, -79, "white_concrete"),
    fillBedrock(-40, 25, -79, 40, 25, -79, "white_concrete"),
    ...drawPixelTextMirrored("MOON PARK", -27, 16, -81, "white_concrete"),
    fillBedrock(-44, 1, -121, 44, 6, -113, "white_concrete"),
    fillBedrock(-38, 7, -121, 38, 7, -113, "cyan_concrete"),
    fillBedrock(-4, 1, -132, 4, 2, -72, "cyan_concrete"),
    fillBedrock(-1, 3, -132, 1, 3, -72, "white_concrete"),
  );

  for (const x of [-88, -78, -58, 58, 78, 88]) {
    commands.push(fillBedrock(x, 7, -134, x, 35, -134, "light_gray_concrete"), setBedrock(x, 36, -134, blocks.light));
  }
  for (const x of [-72, -48, -24, 24, 48, 72]) {
    commands.push(setBedrock(x, 8, -112, blocks.light), setBedrock(x, 9, -112, "cyan_concrete"));
  }
  addFlagPole(commands, -96, -118, "blue_concrete", blocks.light);
  addFlagPole(commands, 92, -118, "lime_concrete", blocks.light);
}

function addV5RocketHero(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Visual v5: taller layered rocket, launch pad rings, and visible gantry");
  commands.push(
    fillBedrock(-34, 1, -34, 34, 4, 34, "stone"),
    fillBedrock(-30, 5, -30, 30, 6, 30, "light_gray_concrete"),
    fillBedrock(-24, 7, -24, 24, 8, 24, "white_concrete"),
    fillBedrock(-18, 1, -18, 18, 2, 18, "black_concrete"),
  );

  for (let ring = 34; ring >= 14; ring -= 5) {
    commands.push(
      fillBedrock(-ring, 1, -ring, ring, 1, -ring, blocks.light),
      fillBedrock(-ring, 1, ring, ring, 1, ring, blocks.light),
      fillBedrock(-ring, 1, -ring, -ring, 1, ring, blocks.light),
      fillBedrock(ring, 1, -ring, ring, 1, ring, blocks.light),
    );
  }

  for (let y = 9; y <= 48; y += 4) {
    const r = y < 20 ? 7 : y < 32 ? 6 : y < 44 ? 5 : 4;
    commands.push(
      fillBedrock(-r, y, -3, r, y + 3, 3, "white_concrete"),
      fillBedrock(-3, y, -r, 3, y + 3, r, "white_concrete"),
    );
  }
  commands.push(
    fillBedrock(-5, 18, -8, 5, 28, -8, "cyan_concrete"),
    fillBedrock(-4, 31, -7, 4, 39, -7, "glass"),
    fillBedrock(-3, 49, -3, 3, 52, 3, "white_concrete"),
    fillBedrock(-2, 53, -2, 2, 57, 2, "orange_concrete"),
    setBedrock(0, 58, 0, blocks.light),
    fillBedrock(-14, 5, -14, -8, 27, -8, "white_concrete"),
    fillBedrock(8, 5, -14, 14, 27, -8, "white_concrete"),
    fillBedrock(-14, 5, 8, -8, 27, 14, "white_concrete"),
    fillBedrock(8, 5, 8, 14, 27, 14, "white_concrete"),
    fillBedrock(-18, 1, 11, -10, 9, 22, "orange_concrete"),
    fillBedrock(10, 1, 11, 18, 9, 22, "orange_concrete"),
    fillBedrock(-8, 1, 14, 8, 11, 26, "yellow_concrete"),
  );

  for (const [x, z] of [
    [-40, -28],
    [40, -28],
    [-40, 28],
    [40, 28],
  ] as const) {
    addGlowPylon(commands, x, z, 38, "cyan_concrete", blocks.light);
  }
  commands.push(
    fillBedrock(22, 1, -31, 27, 48, -26, "iron_block"),
    fillBedrock(32, 1, -31, 37, 48, -26, "iron_block"),
    fillBedrock(22, 12, -31, 37, 14, -26, "iron_block"),
    fillBedrock(22, 24, -31, 37, 26, -26, "iron_block"),
    fillBedrock(22, 36, -31, 37, 38, -26, "iron_block"),
    fillBedrock(22, 48, -31, 37, 50, -26, blocks.light),
  );
}

function addV5AttractionFacades(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Visual v5: attraction facades rebuilt with readable Minecraft scale and detail density");
  commands.push(
    fillBedrock(-112, 1, -48, -70, 5, 10, "stone"),
    fillBedrock(-106, 8, -49, -76, 21, -49, "white_concrete"),
    fillBedrock(-102, 11, -50, -80, 17, -50, "blue_concrete"),
    fillBedrock(-104, 7, -48, -100, 20, -48, "glass"),
    fillBedrock(-82, 7, -48, -78, 20, -48, "glass"),
    fillBedrock(-110, 25, -47, -72, 28, 8, "white_concrete"),
    ...drawPixelTextMirrored("BLUE HQ", -101, 13, -51, "white_concrete"),
    fillBedrock(70, 1, -48, 112, 5, 10, "stone"),
    fillBedrock(76, 8, -49, 106, 21, -49, "white_concrete"),
    fillBedrock(80, 11, -50, 102, 17, -50, "lime_concrete"),
    fillBedrock(78, 7, -48, 82, 20, -48, "glass"),
    fillBedrock(100, 7, -48, 104, 20, -48, "glass"),
    fillBedrock(72, 25, -47, 110, 28, 8, "white_concrete"),
    ...drawPixelTextMirrored("GREEN HQ", 75, 13, -51, "white_concrete"),
    fillBedrock(36, 1, -92, 88, 2, -46, "stone"),
    fillBedrock(40, 3, -88, 84, 16, -50, "red_stained_glass", "hollow"),
    fillBedrock(42, 17, -90, 82, 21, -90, "black_concrete"),
    ...drawPixelTextMirrored("LASER", 48, 18, -91, "white_concrete"),
    fillBedrock(40, 2, 36, 100, 2, 96, "black_concrete", "outline"),
    fillBedrock(46, 2, 42, 94, 2, 90, "gray_concrete", "outline"),
    fillBedrock(52, 2, 48, 88, 2, 84, "black_concrete", "outline"),
    fillBedrock(42, 3, 34, 98, 8, 34, "black_concrete"),
    ...drawPixelTextMirrored("ROVER", 50, 5, 33, "white_concrete"),
    fillBedrock(-104, 1, 46, -58, 3, 94, "deepslate"),
    fillBedrock(-101, 4, 39, -61, 13, 39, "purple_concrete"),
    ...drawPixelTextMirrored("CRYSTAL", -100, 7, 38, "white_concrete"),
  );
  addBoxShell(commands, -108, 6, -46, -74, 24, 6, "blue_concrete");
  addBoxShell(commands, 74, 6, -46, 108, 24, 6, "lime_concrete");
  addBoxShell(commands, -108, 1, 42, -54, 22, 98, "blackstone");

  for (let z = -82; z <= -54; z += 7) {
    commands.push(fillBedrock(43, 4, z, 82, 4, z, "red_stained_glass"), fillBedrock(43, 10, z + 2, 82, 10, z + 2, "red_stained_glass"));
  }
  for (let x = 46; x <= 94; x += 8) {
    commands.push(setBedrock(x, 3, 40, blocks.light), setBedrock(x, 3, 92, blocks.light));
  }
  for (const [x, z, h] of [
    [-100, 60, 15],
    [-94, 84, 12],
    [-84, 54, 17],
    [-76, 88, 13],
    [-66, 68, 16],
    [-60, 52, 10],
  ] as const) {
    addCrystalCluster(commands, x, z, h, "amethyst_block", blocks.light);
  }
}

function addReferenceMoonTerrain(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: cobblestone moon terrain with terraced Minecraft material texture");
  fillTiledBedrock(commands, -136, -1, -146, 136, -1, 136, "stone");
  fillTiledBedrock(commands, -128, 0, -138, 128, 0, 128, "cobblestone");

  for (let level = 0; level < 9; level += 1) {
    const inset = level * 7;
    const y = 1 + Math.floor(level / 2);
    const block = level % 3 === 0 ? "cobblestone" : level % 3 === 1 ? "stone" : "stone_bricks";
    commands.push(
      fillBedrock(-132 + inset, y, 116 - inset, 132 - inset, y, 128 - inset, block),
      fillBedrock(-132 + inset, y + 1, 122 - inset, 132 - inset, y + 1, 128 - inset, block),
      fillBedrock(-132, y, -126 + inset, -120 + inset, y + 1, 120 - inset, block),
      fillBedrock(120 - inset, y, -126 + inset, 132, y + 1, 120 - inset, block),
    );
  }

  for (let x = -124; x <= 124; x += 8) {
    const rearHeight = 5 + Math.abs((x * 19) % 8);
    commands.push(fillBedrock(x - 3, 1, 120, x + 3, rearHeight, 134, x % 16 === 0 ? "stone_bricks" : "cobblestone"));
  }
  for (let z = -116; z <= 112; z += 12) {
    commands.push(
      fillBedrock(-136, 1, z - 4, -124, 4 + Math.abs((z * 13) % 6), z + 4, z % 24 === 0 ? "stone_bricks" : "cobblestone"),
      fillBedrock(124, 1, z - 4, 136, 5 + Math.abs((z * 17) % 6), z + 4, z % 24 === 0 ? "stone" : "cobblestone"),
    );
  }

  for (let x = -120; x <= 120; x += 8) {
    for (let z = -132; z <= 120; z += 8) {
      if (Math.abs(x) <= 10 || (z < -132 && Math.abs(x) < 72)) continue;
      const selector = Math.abs((x * 23 + z * 37) % 6);
      const block = selector === 0 ? "stone_bricks" : selector === 1 ? "stone" : selector === 2 ? "smooth_stone" : "cobblestone";
      commands.push(setBedrock(x, 1, z, block));
    }
  }

  for (const [x, z, radius] of [
    [-102, -88, 11],
    [-92, 62, 18],
    [-50, -98, 13],
    [-28, 44, 16],
    [38, -102, 12],
    [96, 62, 17],
    [108, -88, 10],
  ] as const) {
    for (let ring = 0; ring < 4; ring += 1) {
      const r = radius - ring * 3;
      const y = 1 + ring;
      const block = ring % 2 === 0 ? "cobblestone" : "stone";
      commands.push(
        fillBedrock(x - r, y, z - r, x + r, y, z - r, block),
        fillBedrock(x - r, y, z + r, x + r, y, z + r, block),
        fillBedrock(x - r, y, z - r, x - r, y, z + r, block),
        fillBedrock(x + r, y, z - r, x + r, y, z + r, block),
      );
    }
    commands.push(fillBedrock(x - 3, 1, z - 3, x + 3, 1, z + 3, "black_concrete"));
  }

  for (const [x1, z1, x2, z2, height, block] of [
    [-132, -128, -104, -116, 4, "cobblestone"],
    [-128, -108, -92, -96, 3, "stone"],
    [-122, -84, -100, -72, 5, "stone_bricks"],
    [-132, -52, -106, -36, 4, "cobblestone"],
    [-128, 18, -92, 34, 5, "stone"],
    [-132, 84, -98, 108, 6, "cobblestone"],
    [104, -128, 132, -114, 4, "stone"],
    [92, -108, 128, -94, 3, "cobblestone"],
    [100, -84, 122, -70, 5, "stone_bricks"],
    [106, -50, 132, -34, 4, "stone"],
    [92, 14, 128, 30, 5, "cobblestone"],
    [98, 82, 132, 108, 6, "stone_bricks"],
    [-54, -118, -24, -104, 3, "cobblestone"],
    [24, -118, 54, -104, 3, "stone"],
    [-66, 42, -38, 58, 4, "stone_bricks"],
    [38, 42, 66, 58, 4, "cobblestone"],
  ] as const) {
    for (let y = 2; y <= height; y += 1) {
      const inset = y - 2;
      commands.push(fillBedrock(x1 + inset, y, z1 + inset, x2 - inset, y, z2 - inset, block));
    }
  }

  for (let z = -136; z <= 2; z += 10) {
    commands.push(setBedrock(-12, 2, z, blocks.light), setBedrock(12, 2, z, blocks.light));
  }
}

function addCleanMoonTerrain(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v31: expanded full-block moon park structural base supports vehicle-scale roads and SpaceX-style entry gate");
  fillTiledBedrock(commands, -204, -1, -224, 204, -1, 188, "stone");
  fillTiledBedrock(commands, -196, 0, -216, 196, 0, 180, "cobblestone");
  commands.push(
    fillBedrock(-196, 1, -216, 196, 1, -216, "stone_bricks"),
    fillBedrock(-196, 1, 180, 196, 1, 180, "stone_bricks"),
    fillBedrock(-196, 1, -216, -196, 1, 180, "stone_bricks"),
    fillBedrock(196, 1, -216, 196, 1, 180, "stone_bricks"),
  );

  for (const [x1, z1, x2, z2] of [
    [-118, -126, -96, -112],
    [96, -126, 118, -112],
    [-118, 104, -96, 120],
    [96, 104, 118, 120],
  ] as const) {
    commands.push(
      fillBedrock(x1, 1, z1, x2, 1, z2, "stone"),
      fillBedrock(x1 + 3, 2, z1 + 3, x2 - 3, 2, z2 - 3, "smooth_stone"),
    );
  }

  for (const [x, z] of [
    [-104, -96],
    [104, -96],
    [-104, 92],
    [104, 92],
    [-68, 108],
    [68, 108],
  ] as const) {
    addMiniCrater(commands, x, z, "stone", "gray_concrete");
  }

  commands.push(
    fillBedrock(-204, 1, -224, 204, 4, -224, "stone_bricks"),
    fillBedrock(-204, 1, 188, 204, 4, 188, "stone_bricks"),
    fillBedrock(-204, 1, -224, -204, 4, 188, "stone_bricks"),
    fillBedrock(204, 1, -224, 204, 4, 188, "stone_bricks"),
  );
}

function addBlueWhiteRunway(commands: string[], x1: number, z1: number, x2: number, z2: number, y: number): void {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);
  commands.push(
    fillBedrock(minX - 4, 0, minZ, maxX + 4, y - 1, maxZ, "cobblestone"),
    fillBedrock(minX - 3, y, minZ, minX - 2, y, maxZ, "stone_bricks"),
    fillBedrock(maxX + 2, y, minZ, maxX + 3, y, maxZ, "stone_bricks"),
  );

  let band = 0;
  for (let z = minZ; z <= maxZ; z += 6) {
    const block = band % 2 === 0 ? "cyan_concrete" : "white_concrete";
    commands.push(fillBedrock(minX, y, z, maxX, y, Math.min(z + 5, maxZ), block));
    band += 1;
  }

  for (let z = minZ + 4; z <= maxZ; z += 12) {
    commands.push(setBedrock(minX - 5, y + 1, z, "sea_lantern"), setBedrock(maxX + 5, y + 1, z, "sea_lantern"));
  }
}

function addCleanVerticalRoad(commands: string[], centerX: number, z1: number, z2: number, halfWidth: number, y: number): void {
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);
  const minX = centerX - halfWidth;
  const maxX = centerX + halfWidth;
  commands.push(
    fillBedrock(minX - 4, y - 1, minZ, maxX + 4, y - 1, maxZ, "stone"),
    fillBedrock(minX - 2, y, minZ, maxX + 2, y, maxZ, "smooth_stone"),
    fillBedrock(minX, y, minZ, maxX, y, maxZ, "gray_concrete"),
    fillBedrock(minX + 2, y, minZ, minX + 2, y, maxZ, "white_concrete"),
    fillBedrock(maxX - 2, y, minZ, maxX - 2, y, maxZ, "white_concrete"),
    fillBedrock(centerX - 1, y, minZ, centerX - 1, y, maxZ, "yellow_concrete"),
    fillBedrock(centerX + 1, y, minZ, centerX + 1, y, maxZ, "yellow_concrete"),
  );
  fillTiledBedrock(commands, minX, y + 1, minZ, maxX, 10, maxZ, "air");
  const laneOffset = Math.max(6, Math.floor(halfWidth * 0.48));
  for (let z = minZ + 6; z <= maxZ; z += 14) {
    commands.push(
      fillBedrock(centerX - laneOffset, y, z, centerX - laneOffset, y, Math.min(z + 5, maxZ), "white_concrete"),
      fillBedrock(centerX + laneOffset, y, z, centerX + laneOffset, y, Math.min(z + 5, maxZ), "white_concrete"),
      setBedrock(minX - 3, y + 1, z, "sea_lantern"),
      setBedrock(maxX + 3, y + 1, z, "sea_lantern"),
    );
  }
}

function addCleanHorizontalRoad(commands: string[], x1: number, x2: number, centerZ: number, halfWidth: number, y: number): void {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minZ = centerZ - halfWidth;
  const maxZ = centerZ + halfWidth;
  commands.push(
    fillBedrock(minX, y - 1, minZ - 4, maxX, y - 1, maxZ + 4, "stone"),
    fillBedrock(minX, y, minZ - 2, maxX, y, maxZ + 2, "smooth_stone"),
    fillBedrock(minX, y, minZ, maxX, y, maxZ, "gray_concrete"),
    fillBedrock(minX, y, minZ + 2, maxX, y, minZ + 2, "white_concrete"),
    fillBedrock(minX, y, maxZ - 2, maxX, y, maxZ - 2, "white_concrete"),
    fillBedrock(minX, y, centerZ - 1, maxX, y, centerZ - 1, "yellow_concrete"),
    fillBedrock(minX, y, centerZ + 1, maxX, y, centerZ + 1, "yellow_concrete"),
  );
  fillTiledBedrock(commands, minX, y + 1, minZ, maxX, 10, maxZ, "air");
  const laneOffset = Math.max(6, Math.floor(halfWidth * 0.48));
  for (let x = minX + 6; x <= maxX; x += 14) {
    commands.push(
      fillBedrock(x, y, centerZ - laneOffset, Math.min(x + 5, maxX), y, centerZ - laneOffset, "white_concrete"),
      fillBedrock(x, y, centerZ + laneOffset, Math.min(x + 5, maxX), y, centerZ + laneOffset, "white_concrete"),
    );
    if (x < -12 || x > 12) {
      commands.push(setBedrock(x, y + 1, minZ - 3, "sea_lantern"), setBedrock(x, y + 1, maxZ + 3, "sea_lantern"));
    }
  }
}

function addCleanParkRingRoadNetwork(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v31: expanded vehicle-scale ring road loops around every park district with lane markings");
  addBlueprintBoxes(commands, "moon-park-ring-road-network", [
    { id: "entry-vehicle-boulevard", layer: "route", x1: -18, y1: 2, z1: -226, x2: 18, y2: 2, z2: -48, block: "gray_concrete" },
    { id: "north-ring-road", layer: "route", x1: -184, y1: 2, z1: -124, x2: 184, y2: 2, z2: -96, block: "gray_concrete" },
    { id: "south-ring-road", layer: "route", x1: -184, y1: 2, z1: 158, x2: 184, y2: 2, z2: 186, block: "gray_concrete" },
    { id: "west-ring-road", layer: "route", x1: -198, y1: 2, z1: -110, x2: -170, y2: 2, z2: 172, block: "gray_concrete" },
    { id: "east-ring-road", layer: "route", x1: 170, y1: 2, z1: -110, x2: 198, y2: 2, z2: 172, block: "gray_concrete" },
    { id: "green-hq-south-ring-connector", layer: "route", x1: -184, y1: 2, z1: -18, x2: -78, y2: 2, z2: 2, block: "gray_concrete" },
    { id: "blue-hq-south-ring-connector", layer: "route", x1: 78, y1: 2, z1: -18, x2: 184, y2: 2, z2: 2, block: "gray_concrete" },
    { id: "laser-maze-ring-connector", layer: "route", x1: 44, y1: 2, z1: -110, x2: 60, y2: 2, z2: -86, block: "gray_concrete" },
    { id: "rover-speedway-ring-connector", layer: "route", x1: -73, y1: 2, z1: -110, x2: -57, y2: 2, z2: -86, block: "gray_concrete" },
    { id: "central-spine-south-ring-connector", layer: "route", x1: -14, y1: 2, z1: 112, x2: 14, y2: 2, z2: 172, block: "gray_concrete" },
    { id: "crystal-cave-ring-connector", layer: "route", x1: -98, y1: 2, z1: 98, x2: -78, y2: 2, z2: 172, block: "gray_concrete" },
    { id: "final-launch-ring-connector", layer: "route", x1: -58, y1: 2, z1: 126, x2: -38, y2: 2, z2: 172, block: "gray_concrete" },
  ]);

  addCleanHorizontalRoad(commands, -184, 184, -110, 14, 2);
  addCleanHorizontalRoad(commands, -184, 184, 172, 14, 2);
  addCleanVerticalRoad(commands, -184, -110, 172, 14, 2);
  addCleanVerticalRoad(commands, 184, -110, 172, 14, 2);

  addCleanHorizontalRoad(commands, -184, -78, -8, 10, 2);
  addCleanHorizontalRoad(commands, 78, 184, -8, 10, 2);
  addCleanVerticalRoad(commands, -78, -32, -8, 9, 2);
  addCleanVerticalRoad(commands, 78, -32, -8, 9, 2);
  addCleanVerticalRoad(commands, 52, -110, -86, 8, 2);
  addCleanVerticalRoad(commands, -65, -110, -86, 8, 2);
  addCleanVerticalRoad(commands, 0, 112, 172, 14, 2);
  addCleanVerticalRoad(commands, -88, 98, 172, 10, 2);
  addCleanVerticalRoad(commands, -48, 126, 172, 10, 2);

  for (const [x, z, direction] of [
    [-168, -110, "west"],
    [168, -110, "east"],
    [-184, -8, "south"],
    [184, -8, "south"],
    [0, 146, "south"],
    [-88, 140, "south"],
    [-48, 150, "south"],
  ] as const) {
    addFloorArrow(commands, x, z, direction, blocks.light);
  }
}

function addCleanParkRoadGrid(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v31: obstruction-free vehicle roads, wider lanes, curbs, double yellow lines, white edge lines, and clear driving space");
  addCleanParkRingRoadNetwork(commands, blocks);
  addCleanVerticalRoad(commands, 0, -226, -48, 18, 2);
  addCleanVerticalRoad(commands, 0, 28, 172, 14, 2);
  addCleanHorizontalRoad(commands, -82, -42, -32, 10, 2);
  addCleanHorizontalRoad(commands, 42, 82, -32, 10, 2);
  addCleanHorizontalRoad(commands, -128, -42, 28, 10, 2);
  addCleanHorizontalRoad(commands, 42, 128, 28, 10, 2);
  addCleanHorizontalRoad(commands, -80, 80, 76, 10, 2);
  commands.push(
    fillBedrock(-46, 1, -52, 46, 1, 32, "cobblestone"),
    fillBedrock(-42, 2, -48, 42, 2, 28, "smooth_stone", "outline"),
    fillBedrock(-34, 2, -40, 34, 2, 20, "stone_bricks", "outline"),
    fillBedrock(-24, 2, -30, 24, 2, 10, "white_concrete", "outline"),
    fillBedrock(-16, 2, -22, 16, 2, 2, blocks.light, "outline"),
  );
  for (const [x, z, direction, color] of [
    [0, -122, "north", "white_concrete"],
    [0, -84, "north", "white_concrete"],
    [-86, -32, "west", "white_concrete"],
    [86, -32, "east", "white_concrete"],
    [-86, 28, "west", "white_concrete"],
    [86, 28, "east", "white_concrete"],
    [0, 58, "south", "white_concrete"],
    [0, 96, "south", "white_concrete"],
  ] as const) {
    addFloorArrow(commands, x, z, direction, color);
  }
}

function addReferenceMainRoute(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: solid blue-white runway from the gate to the central rocket plaza");
  addBlueWhiteRunway(commands, -10, -142, 10, 8, 2);
  commands.push(
    fillBedrock(-40, 1, -12, 40, 1, 12, "cyan_concrete"),
    fillBedrock(-34, 2, -6, 34, 2, 6, "white_concrete"),
    fillBedrock(-38, 1, -50, 38, 1, 26, "stone_bricks", "outline"),
    fillBedrock(-30, 1, -42, 30, 1, 18, "cyan_concrete", "outline"),
    fillBedrock(-22, 1, -34, 22, 1, 10, "white_concrete", "outline"),
    fillBedrock(-14, 1, -26, 14, 1, 2, blocks.light, "outline"),
  );

  for (let z = -134; z <= -12; z += 12) {
    commands.push(
      fillBedrock(-2, 3, z, 2, 3, z + 2, z % 24 === 0 ? "white_concrete" : "cyan_concrete"),
      setBedrock(-14, 2, z, blocks.light),
      setBedrock(14, 2, z, blocks.light),
    );
  }
  for (let x = -32; x <= 32; x += 8) {
    commands.push(setBedrock(x, 2, -15, blocks.light), setBedrock(x, 2, 15, blocks.light));
  }
}

function addGreekTempleColumn(commands: string[], x: number, z: number, y1: number, y2: number, light: string): void {
  commands.push(
    fillBedrock(x - 4, y1, z - 3, x + 4, y1 + 1, z + 3, "stone_bricks"),
    fillBedrock(x - 3, y1 + 2, z - 2, x + 3, y1 + 3, z + 2, "smooth_quartz"),
    fillBedrock(x - 1, y1 + 4, z - 1, x + 1, y2 - 3, z + 1, "quartz_block"),
    fillBedrock(x - 2, y1 + 5, z, x + 2, y2 - 4, z, "smooth_quartz"),
    fillBedrock(x, y1 + 5, z - 2, x, y2 - 4, z + 2, "smooth_quartz"),
    fillBedrock(x - 3, y2 - 2, z - 2, x + 3, y2 - 1, z + 2, "smooth_quartz"),
    fillBedrock(x - 4, y2, z - 3, x + 4, y2 + 1, z + 3, "stone_bricks"),
    setBedrock(x, y2 + 2, z, light),
  );
}

function addGreekPediment(commands: string[], z1: number, z2: number, light: string): void {
  commands.push(
    fillBedrock(-98, 31, z1, 98, 34, z2, "smooth_quartz"),
    fillBedrock(-92, 35, z1 - 1, 92, 36, z1 - 1, "stone_bricks"),
    fillBedrock(-88, 34, z1 - 2, 88, 34, z1 - 2, "cyan_concrete"),
  );

  for (let row = 0; row <= 12; row += 1) {
    const inset = row * 7;
    const y = 37 + row;
    const halfWidth = Math.max(0, 90 - inset);
    const block = row % 3 === 0 ? "smooth_quartz" : "quartz_block";
    commands.push(fillBedrock(-halfWidth, y, z1, halfWidth, y, z2, block));
    if (halfWidth >= 14) {
      commands.push(fillBedrock(-halfWidth, y, z1 - 1, -halfWidth + 4, y, z1 - 1, "stone_bricks"));
      commands.push(fillBedrock(halfWidth - 4, y, z1 - 1, halfWidth, y, z1 - 1, "stone_bricks"));
    }
  }

  commands.push(
    fillBedrock(-12, 40, z1 - 2, 12, 47, z1 - 2, "cyan_concrete"),
    fillBedrock(-8, 41, z1 - 3, 8, 46, z1 - 3, "sea_lantern"),
    setBedrock(0, 49, z1 - 3, light),
  );
}

function addTempleGarden(commands: string[], x: number, z: number): void {
  commands.push(
    fillBedrock(x - 12, 0, z - 12, x + 12, 1, z + 12, "stone"),
    fillBedrock(x - 11, 2, z - 11, x + 11, 2, z + 11, "stone_bricks"),
    fillBedrock(x - 9, 3, z - 9, x + 9, 3, z + 9, "moss_block"),
    fillBedrock(x - 10, 3, z - 10, x + 10, 4, z + 10, "smooth_quartz", "outline"),
    fillBedrock(x - 1, 4, z - 1, x + 1, 11, z + 1, "oak_log"),
    fillBedrock(x - 6, 12, z - 6, x + 6, 16, z + 6, "cherry_leaves"),
    fillBedrock(x - 4, 17, z - 4, x + 4, 20, z + 4, "cherry_leaves"),
    setBedrock(x, 21, z, "sea_lantern"),
  );
}

function addOvalCylinder(commands: string[], centerX: number, centerZ: number, y1: number, y2: number, radiusX: number, radiusZ: number, block: string): void {
  for (let dz = -radiusZ; dz <= radiusZ; dz += 1) {
    const normalized = radiusZ === 0 ? 0 : (dz * dz) / (radiusZ * radiusZ);
    const halfWidth = Math.max(0, Math.floor(radiusX * Math.sqrt(Math.max(0, 1 - normalized))));
    commands.push(fillBedrock(centerX - halfWidth, y1, centerZ + dz, centerX + halfWidth, y2, centerZ + dz, block));
  }
}

function addStarshipHeatShield(commands: string[], y1: number, y2: number, z: number): void {
  for (let y = y1; y <= y2; y += 6) {
    const yTop = Math.min(y + 3, y2);
    commands.push(
      fillBedrock(-5, y, z, 5, yTop, z, "black_concrete"),
      fillBedrock(-2, y + 1, z - 1, 2, Math.min(y + 2, yTop), z - 1, "gray_concrete"),
    );
  }
}

function addLaunchTower(commands: string[], blocks: MinecraftBlockSet): void {
  const minX = -26;
  const maxX = -14;
  const minZ = -30;
  const maxZ = 4;

  for (const [x, z] of [
    [minX, minZ],
    [maxX - 1, minZ],
    [minX, maxZ - 1],
    [maxX - 1, maxZ - 1],
  ] as const) {
    commands.push(fillBedrock(x, 5, z, x + 1, 126, z + 1, "iron_block"));
  }

  for (let y = 12; y <= 120; y += 12) {
    commands.push(
      fillBedrock(minX, y, minZ, maxX, y + 1, minZ + 1, "iron_block"),
      fillBedrock(minX, y, maxZ - 1, maxX, y + 1, maxZ, "iron_block"),
      fillBedrock(minX, y, minZ, minX + 1, y + 1, maxZ, "iron_block"),
      fillBedrock(maxX - 1, y, minZ, maxX, y + 1, maxZ, "iron_block"),
      fillBedrock(minX + 3, y + 2, minZ + 3, maxX - 3, y + 2, maxZ - 3, y % 24 === 0 ? "blackstone" : "gray_concrete"),
    );
  }

  commands.push(
    fillBedrock(minX - 2, 126, minZ - 2, maxX + 2, 129, maxZ + 2, "iron_block", "outline"),
    fillBedrock(-39, 130, -39, -36, 140, -36, "iron_block"),
    setBedrock(-37, 141, -37, blocks.light),
  );
}

function addServiceArms(commands: string[], blocks: MinecraftBlockSet): void {
  for (const y of [54, 88] as const) {
    commands.push(
      fillBedrock(-18, y, -19, -6, y + 1, -17, "iron_block"),
      fillBedrock(-18, y, -7, -6, y + 1, -5, "iron_block"),
      fillBedrock(-7, y - 1, -19, -4, y + 2, -17, "black_concrete"),
      fillBedrock(-7, y - 1, -7, -4, y + 2, -5, "black_concrete"),
      fillBedrock(-18, y + 2, -15, -7, y + 2, -9, "gray_concrete", "outline"),
      setBedrock(-12, y + 3, -18, blocks.light),
      setBedrock(-12, y + 3, -6, blocks.light),
    );
  }
  commands.push(
    fillBedrock(-20, 72, -16, -6, 74, -10, "iron_block"),
    fillBedrock(-7, 70, -16, -4, 76, -10, "gray_concrete"),
    fillBedrock(-20, 104, -17, -8, 106, -9, "iron_block"),
    fillBedrock(-8, 103, -16, -5, 107, -10, "gray_concrete"),
    setBedrock(-8, 108, -13, blocks.light),
  );
}

function addReferenceGreekGate(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v26: grid-blueprint Greek-temple MOON PARK gate with explicit clear, foundation, route, structure, and decoration layers");
  addBlueprintBoxes(commands, "moon-park-entry-gate", [
    { id: "left-back-wall-slot", layer: "clear", x1: -108, y1: 5, z1: -132, x2: -14, y2: 18, z2: -112, block: "air" },
    { id: "right-back-wall-slot", layer: "clear", x1: 14, y1: 5, z1: -132, x2: 108, y2: 18, z2: -112, block: "air" },
    { id: "center-sign-slot", layer: "clear", x1: -40, y1: 10, z1: -130, x2: 40, y2: 18, z2: -124, block: "air" },
    { id: "forecourt-bedrock-stone", layer: "foundation", x1: -136, y1: 0, z1: -176, x2: 136, y2: 1, z2: -104, block: "stone" },
    { id: "forecourt-cobble-slab", layer: "foundation", x1: -128, y1: 2, z1: -172, x2: 128, y2: 2, z2: -108, block: "cobblestone" },
    { id: "inner-full-block-grid", layer: "foundation", x1: -112, y1: 0, z1: -172, x2: 112, y2: 0, z2: -108, block: "cobblestone" },
    { id: "gate-main-footprint", layer: "foundation", x1: -104, y1: 1, z1: -168, x2: 104, y2: 1, z2: -112, block: "stone_bricks" },
    { id: "left-front-plinth", layer: "foundation", x1: -96, y1: 2, z1: -160, x2: -18, y2: 4, z2: -132, block: "smooth_quartz" },
    { id: "right-front-plinth", layer: "foundation", x1: 18, y1: 2, z1: -160, x2: 96, y2: 4, z2: -132, block: "smooth_quartz" },
    { id: "left-back-wall-foundation", layer: "foundation", x1: -104, y1: 2, z1: -130, x2: -18, y2: 4, z2: -114, block: "stone_bricks" },
    { id: "right-back-wall-foundation", layer: "foundation", x1: 18, y1: 2, z1: -130, x2: 104, y2: 4, z2: -114, block: "stone_bricks" },
    { id: "left-step-cap", layer: "structure", x1: -88, y1: 5, z1: -150, x2: -22, y2: 7, z2: -126, block: "quartz_block" },
    { id: "right-step-cap", layer: "structure", x1: 22, y1: 5, z1: -150, x2: 88, y2: 7, z2: -126, block: "quartz_block" },
    { id: "left-back-wall", layer: "structure", x1: -104, y1: 5, z1: -128, x2: -18, y2: 9, z2: -116, block: "stone_bricks" },
    { id: "right-back-wall", layer: "structure", x1: 18, y1: 5, z1: -128, x2: 104, y2: 9, z2: -116, block: "stone_bricks" },
    { id: "left-sign-shoulder", layer: "structure", x1: -96, y1: 10, z1: -126, x2: -58, y2: 16, z2: -116, block: "smooth_quartz" },
    { id: "right-sign-shoulder", layer: "structure", x1: 58, y1: 10, z1: -126, x2: 96, y2: 16, z2: -116, block: "smooth_quartz" },
    { id: "center-sign-band", layer: "decoration", x1: -34, y1: 11, z1: -127, x2: 34, y2: 13, z2: -127, block: "cyan_concrete" },
  ]);
  commands.push(...drawPixelTextMirrored("MOON PARK", -26, 14, -128, "white_concrete"));

  for (let step = 0; step < 8; step += 1) {
    const y = 2 + Math.floor(step / 2);
    const z1 = -170 + step * 5;
    const z2 = z1 + 4;
    commands.push(
      fillBedrock(-96 + step * 4, 1, z1, -18, y - 1, z2, "cobblestone"),
      fillBedrock(18, 1, z1, 96 - step * 4, y - 1, z2, "cobblestone"),
      fillBedrock(-96 + step * 4, y, z1, -18, y, z2, step % 2 === 0 ? "smooth_quartz" : "quartz_block"),
      fillBedrock(18, y, z1, 96 - step * 4, y, z2, step % 2 === 0 ? "smooth_quartz" : "quartz_block"),
    );
  }

  for (const x of [-72, -54, -36, 36, 54, 72]) {
    addGreekTempleColumn(commands, x, -144, 8, 30, blocks.light);
  }
  for (const x of [-84, -60, -36, 36, 60, 84]) {
    addGreekTempleColumn(commands, x, -132, 8, 28, blocks.light);
  }

  addGreekPediment(commands, -148, -132, blocks.light);
  for (const [x, z, ceilingY, drop] of [
    [-78, -146, 35, 7],
    [-54, -146, 34, 6],
    [-30, -146, 33, 5],
    [30, -146, 33, 5],
    [54, -146, 34, 6],
    [78, -146, 35, 7],
    [-24, -132, 28, 5],
    [24, -132, 28, 5],
    [-12, -116, 22, 4],
    [12, -116, 22, 4],
  ] as const) {
    addHangingLantern(commands, x, ceilingY, z, drop);
  }
  commands.push(
    fillBedrock(-100, 7, -150, -92, 38, -132, "stone_bricks"),
    fillBedrock(92, 7, -150, 100, 38, -132, "stone_bricks"),
    fillBedrock(-96, 39, -150, -88, 45, -132, "smooth_quartz"),
    fillBedrock(88, 39, -150, 96, 45, -132, "smooth_quartz"),
  );

  addBlueWhiteRunway(commands, -10, -170, 10, -108, 2);
  addTempleGarden(commands, -126, -154);
  addTempleGarden(commands, 126, -154);
  addTempleGarden(commands, -120, -118);
  addTempleGarden(commands, 120, -118);
  addFlagPole(commands, -104, -124, "lime_concrete", blocks.light);
  addFlagPole(commands, 100, -124, "blue_concrete", blocks.light);
}

function addSpaceXLogoRect(commands: string[], z: number, screenX1: number, y1: number, screenX2: number, y2: number): void {
  const worldOriginX = 90;
  const screenScale = 0.55;
  const toWorldX = (screenX: number) => Math.round(worldOriginX - screenX * screenScale);
  const worldA = toWorldX(screenX1);
  const worldB = toWorldX(screenX2);
  commands.push(fillBedrock(Math.min(worldA, worldB), y1, z, Math.max(worldA, worldB), y2, z, "white_concrete"));
}

function addSpaceXLogo(commands: string[], z: number): void {
  const yOffset = -4;
  const r = (screenX1: number, y1: number, screenX2: number, y2: number) =>
    addSpaceXLogoRect(commands, z, screenX1, y1 + yOffset, screenX2, y2 + yOffset);
  const stroke = (screenX1: number, y1: number, screenX2: number, y2: number, width = 5, samples = 12) => {
    for (let index = 0; index <= samples; index += 1) {
      const t = index / samples;
      const x = screenX1 + (screenX2 - screenX1) * t;
      const y = y1 + (y2 - y1) * t;
      r(
        Math.round(x - width / 2),
        Math.round(y - width / 2),
        Math.round(x + width / 2),
        Math.round(y + width / 2),
      );
    }
  };
  const curve = (
    screenX1: number,
    y1: number,
    controlX: number,
    controlY: number,
    screenX2: number,
    y2: number,
    width = 4,
    samples = 22,
  ) => {
    for (let index = 0; index <= samples; index += 1) {
      const t = index / samples;
      const inv = 1 - t;
      const x = inv * inv * screenX1 + 2 * inv * t * controlX + t * t * screenX2;
      const y = inv * inv * y1 + 2 * inv * t * controlY + t * t * y2;
      r(
        Math.round(x - width / 2),
        Math.round(y - width / 2),
        Math.round(x + width / 2),
        Math.round(y + width / 2),
      );
    }
  };

  // S
  r(8, 53, 40, 56);
  r(8, 45, 12, 56);
  r(8, 43, 36, 46);
  r(36, 34, 40, 46);
  r(8, 34, 40, 37);

  // P
  r(50, 34, 54, 56);
  r(50, 53, 82, 56);
  r(78, 45, 82, 56);
  r(50, 43, 82, 46);

  // A: SpaceX-style open A: only the mid-bar and one strong right rising side.
  r(94, 43, 126, 46);
  stroke(130, 34, 112, 56, 4, 12);

  // C
  r(148, 53, 184, 56);
  r(148, 34, 184, 37);
  r(148, 34, 152, 56);

  // E
  r(196, 34, 200, 56);
  r(196, 53, 232, 56);
  r(196, 43, 224, 46);
  r(196, 34, 232, 37);

  // X: low, connected strokes plus the SpaceX-style right sweep. Keep it letter-height, not gate-height.
  stroke(240, 53, 260, 44, 3, 9);
  stroke(240, 35, 260, 44, 3, 9);
  stroke(260, 44, 271, 36, 3, 6);
  curve(260, 44, 294, 49, 336, 52, 2, 24);
}

function addReferenceGate(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v37: clean SpaceX-inspired entry gate with logo mounted on the real rear gate, no extra front logo frame, half A, curved X sweep, car-width portal, guard booths, and vehicle apron");
  addBlueprintBoxes(commands, "spacex-entry-gate", [
    { id: "expanded-entry-clearance", layer: "clear", x1: -188, y1: 1, z1: -222, x2: 188, y2: 62, z2: -118, block: "air" },
    { id: "vehicle-apron-foundation", layer: "foundation", x1: -196, y1: 0, z1: -224, x2: 196, y2: 1, z2: -116, block: "stone" },
    { id: "smooth-entry-concrete", layer: "foundation", x1: -188, y1: 2, z1: -216, x2: 188, y2: 2, z2: -122, block: "smooth_stone" },
    { id: "main-vehicle-boulevard", layer: "route", x1: -20, y1: 2, z1: -224, x2: 20, y2: 2, z2: -96, block: "gray_concrete" },
    { id: "left-black-wall", layer: "structure", x1: -188, y1: 3, z1: -190, x2: -148, y2: 34, z2: -132, block: "black_concrete" },
    { id: "right-black-wall", layer: "structure", x1: 148, y1: 3, z1: -190, x2: 188, y2: 34, z2: -132, block: "black_concrete" },
    { id: "black-horizontal-gate-beam", layer: "structure", x1: -148, y1: 20, z1: -184, x2: 148, y2: 30, z2: -150, block: "black_concrete" },
    { id: "wide-vehicle-portal", layer: "clear", x1: -142, y1: 3, z1: -178, x2: 142, y2: 19, z2: -150, block: "air" },
    { id: "sliding-security-fence", layer: "decoration", x1: -112, y1: 3, z1: -139, x2: 112, y2: 13, z2: -139, block: "iron_bars" },
    { id: "left-guard-booth", layer: "structure", x1: -184, y1: 3, z1: -218, x2: -148, y2: 17, z2: -194, block: "black_concrete" },
    { id: "right-concrete-barrier", layer: "structure", x1: 122, y1: 3, z1: -220, x2: 188, y2: 12, z2: -202, block: "smooth_stone" },
  ]);

  fillTiledBedrock(commands, -196, 0, -224, 196, 1, -116, "stone");
  fillTiledBedrock(commands, -196, 2, -224, 196, 2, -116, "smooth_stone");
  fillTiledBedrock(commands, -188, 3, -190, -148, 34, -132, "black_concrete");
  fillTiledBedrock(commands, 148, 3, -190, 188, 34, -132, "black_concrete");
  fillTiledBedrock(commands, -148, 20, -184, 148, 30, -150, "black_concrete");
  fillTiledBedrock(commands, -142, 3, -178, 142, 19, -150, "air");
  commands.push(
    fillBedrock(-22, 2, -224, 22, 2, -96, "gray_concrete"),
    fillBedrock(-2, 2, -224, -1, 2, -96, "yellow_concrete"),
    fillBedrock(1, 2, -224, 2, 2, -96, "yellow_concrete"),
    fillBedrock(-18, 2, -224, -18, 2, -96, "white_concrete"),
    fillBedrock(18, 2, -224, 18, 2, -96, "white_concrete"),
    fillBedrock(-112, 3, -139, 112, 13, -139, "iron_bars"),
    fillBedrock(-26, 3, -140, 26, 12, -138, "air"),
    fillBedrock(-184, 3, -218, -148, 17, -194, "black_concrete"),
    fillBedrock(-180, 6, -217, -152, 13, -217, "glass"),
    fillBedrock(-183, 15, -218, -149, 18, -194, "gray_concrete"),
    fillBedrock(122, 3, -220, 188, 12, -202, "smooth_stone"),
    fillBedrock(126, 13, -220, 184, 13, -202, "white_concrete"),
  );

  for (let x = -14; x <= 14; x += 14) {
    commands.push(fillBedrock(x, 3, -224, x, 3, -216, "white_concrete"));
  }
  for (let x = -110; x <= 110; x += 22) {
    commands.push(
      fillBedrock(x, 3, -139, x + 1, 13, -139, "iron_block"),
      setBedrock(x, 15, -139, blocks.light),
    );
  }
  for (let z = -220; z <= -126; z += 14) {
    commands.push(setBedrock(-26, 3, z, blocks.light), setBedrock(26, 3, z, blocks.light));
  }

  addSpaceXLogo(commands, -184);
  addFlagPole(commands, -168, -126, "blue_concrete", blocks.light);
  addFlagPole(commands, 168, -126, "lime_concrete", blocks.light);
}

function addReferenceRocket(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v27: tall SpaceX-style Starship/Super Heavy rocket, launch tower, chopstick arms, and clean pad blueprint");
  addBlueprintBoxes(commands, "spacex-style-rocket-launch-complex", [
    { id: "rocket-pad-full-block-foundation", layer: "foundation", x1: -54, y1: 1, z1: -60, x2: 54, y2: 1, z2: 38, block: "stone" },
    { id: "rocket-pad-walkable-deck", layer: "foundation", x1: -50, y1: 2, z1: -56, x2: 50, y2: 2, z2: 34, block: "smooth_stone" },
    { id: "launch-mount-footprint", layer: "foundation", x1: -14, y1: 3, z1: -30, x2: 14, y2: 5, z2: 6, block: "black_concrete" },
    { id: "flame-trench", layer: "foundation", x1: -9, y1: 2, z1: -6, x2: 9, y2: 4, z2: 18, block: "deepslate" },
    { id: "tower-footing", layer: "foundation", x1: -28, y1: 2, z1: -32, x2: -12, y2: 5, z2: 8, block: "stone_bricks" },
    { id: "visitor-ring-left", layer: "route", x1: -54, y1: 3, z1: -60, x2: -18, y2: 3, z2: -54, block: "white_concrete" },
    { id: "visitor-ring-right", layer: "route", x1: 18, y1: 3, z1: -60, x2: 54, y2: 3, z2: -54, block: "white_concrete" },
  ]);
  commands.push(
    "# Blueprint box structure/starship-super-heavy-stack-envelope: -9,6,-22 -> 9,128,-4 iron_block marker",
    "# Blueprint box structure/orbital-launch-tower-envelope: -26,5,-30 -> -14,141,4 iron_block marker",
    "# Blueprint box structure/chopstick-service-arms-envelope: -20,54,-19 -> -4,108,-5 iron_block marker",
  );

  commands.push(
    fillBedrock(-54, 1, -60, 54, 1, 38, "stone"),
    fillBedrock(-50, 2, -56, 50, 2, 34, "smooth_stone"),
    fillBedrock(-14, 3, -30, 14, 5, 6, "black_concrete"),
    fillBedrock(-9, 2, -6, 9, 4, 18, "deepslate"),
    fillBedrock(-28, 2, -32, -12, 5, 8, "stone_bricks"),
    fillBedrock(-54, 3, -60, -18, 3, -54, "white_concrete"),
    fillBedrock(18, 3, -60, 54, 3, -54, "white_concrete"),
    fillBedrock(-50, 3, -56, 50, 3, 34, "stone_bricks", "outline"),
    fillBedrock(-42, 3, -48, 42, 3, 26, "cyan_concrete", "outline"),
    fillBedrock(-34, 3, -40, 34, 3, 18, blocks.light, "outline"),
    fillBedrock(-11, 3, -3, 11, 3, 20, "orange_concrete"),
    fillBedrock(-7, 4, 1, 7, 7, 17, "yellow_concrete"),
    fillBedrock(-5, 5, 5, 5, 10, 14, "glowstone"),
  );

  addOvalCylinder(commands, 0, -12, 6, 9, 10, 10, "black_concrete");
  addOvalCylinder(commands, 0, -12, 10, 78, 8, 8, "iron_block");
  addOvalCylinder(commands, 0, -12, 79, 112, 7, 7, "iron_block");
  addOvalCylinder(commands, 0, -12, 113, 118, 6, 6, "iron_block");
  addOvalCylinder(commands, 0, -12, 119, 123, 5, 5, "iron_block");
  addOvalCylinder(commands, 0, -12, 124, 127, 3, 3, "iron_block");
  addOvalCylinder(commands, 0, -12, 128, 128, 1, 1, "iron_block");

  for (const y of [22, 38, 54, 70, 79, 96] as const) {
    addOvalCylinder(commands, 0, -12, y, y + 1, y >= 79 ? 7 : 8, y >= 79 ? 7 : 8, "light_gray_concrete");
  }
  addStarshipHeatShield(commands, 82, 126, -20);
  commands.push(
    fillBedrock(-3, 105, -21, 3, 110, -21, "black_concrete"),
    fillBedrock(-1, 106, -22, 1, 108, -22, "glass"),
    fillBedrock(-8, 18, -21, -6, 26, -19, "black_concrete"),
    fillBedrock(6, 18, -21, 8, 26, -19, "black_concrete"),
    fillBedrock(-8, 18, -5, -6, 26, -3, "black_concrete"),
    fillBedrock(6, 18, -5, 8, 26, -3, "black_concrete"),
    setBedrock(0, 129, -12, blocks.light),
  );

  addLaunchTower(commands, blocks);
  addServiceArms(commands, blocks);

  for (const [x, z] of [
    [-54, -60],
    [54, -60],
    [-54, 38],
    [54, 38],
    [-18, -54],
    [18, -54],
  ] as const) {
    addGlowPylon(commands, x, z, 24, "cyan_concrete", blocks.light);
  }
}

function addReferenceHq(commands: string[], x1: number, x2: number, z1: number, z2: number, color: string, title: string, blocks: MinecraftBlockSet): void {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);
  const centerX = Math.round((minX + maxX) / 2);
  const frontZ = minZ - 1;
  const textStart = title === "BLUE HQ" ? minX + 8 : minX + 5;
  const secondFloorY = 20;
  const roofBaseY = 33;
  const wallY1 = 6;
  const wallY2 = 32;
  const innerSideX = centerX > 0 ? minX : maxX;
  const outerSideX = centerX > 0 ? maxX : minX;
  const sideDoorZ1 = -31;
  const sideDoorZ2 = -21;
  const doorDirection = centerX > 0 ? "west" : "east";
  const pathX1 = centerX > 0 ? innerSideX - 5 : innerSideX + 1;
  const pathX2 = centerX > 0 ? innerSideX - 1 : innerSideX + 5;
  const insideEntryX = centerX > 0 ? innerSideX + 4 : innerSideX - 4;
  const loungeZ1 = minZ + 15;
  const loungeZ2 = minZ + 19;
  const wallBlock = "white_concrete";
  const trimBlock = "black_concrete";

  commands.push(
    fillBedrock(minX - 5, 1, minZ - 5, maxX + 5, 4, maxZ + 5, "stone"),
    fillBedrock(minX - 4, 5, minZ - 4, maxX + 4, 5, maxZ + 4, "smooth_quartz"),
    fillBedrock(minX + 1, 5, minZ + 1, maxX - 1, 5, maxZ - 1, "oak_planks"),

    fillBedrock(minX, wallY1, minZ, minX + 5, wallY2, minZ, wallBlock),
    fillBedrock(maxX - 5, wallY1, minZ, maxX, wallY2, minZ, wallBlock),
    fillBedrock(minX + 6, wallY1, minZ, centerX - 7, 8, minZ, "white_concrete"),
    fillBedrock(centerX + 7, wallY1, minZ, maxX - 6, 8, minZ, "white_concrete"),
    fillBedrock(minX + 6, secondFloorY + 3, minZ, centerX - 7, wallY2, minZ, "white_concrete"),
    fillBedrock(centerX + 7, secondFloorY + 3, minZ, maxX - 6, wallY2, minZ, "white_concrete"),
    fillBedrock(minX + 8, 9, minZ, centerX - 9, 18, minZ, "glass"),
    fillBedrock(centerX + 9, 9, minZ, maxX - 8, 18, minZ, "glass"),
    fillBedrock(centerX - 5, 15, minZ, centerX + 5, wallY2, minZ, "white_concrete"),

    fillBedrock(minX, wallY1, maxZ, maxX, 8, maxZ, wallBlock),
    fillBedrock(minX, secondFloorY + 3, maxZ, maxX, wallY2, maxZ, wallBlock),
    fillBedrock(minX + 8, 9, maxZ, maxX - 8, secondFloorY - 2, maxZ, "glass"),

    fillBedrock(outerSideX, wallY1, minZ, outerSideX, wallY2, minZ + 5, wallBlock),
    fillBedrock(outerSideX, wallY1, maxZ - 5, outerSideX, wallY2, maxZ, wallBlock),
    fillBedrock(outerSideX, wallY1, minZ + 6, outerSideX, 8, maxZ - 6, "white_concrete"),
    fillBedrock(outerSideX, secondFloorY + 3, minZ + 6, outerSideX, wallY2, maxZ - 6, "white_concrete"),
    fillBedrock(outerSideX, 9, minZ + 6, outerSideX, secondFloorY - 2, maxZ - 6, "glass"),

    fillBedrock(innerSideX, wallY1, minZ, innerSideX, wallY2, sideDoorZ1 - 1, wallBlock),
    fillBedrock(innerSideX, wallY1, sideDoorZ2 + 1, innerSideX, wallY2, maxZ, wallBlock),
    fillBedrock(innerSideX, 14, sideDoorZ1 + 1, innerSideX, secondFloorY - 2, sideDoorZ2 - 1, "glass"),
    fillBedrock(innerSideX, secondFloorY, sideDoorZ1, innerSideX, wallY2, sideDoorZ2, "white_concrete"),
    fillBedrock(innerSideX, wallY1, sideDoorZ1 - 1, innerSideX, 18, sideDoorZ1 - 1, "white_concrete"),
    fillBedrock(innerSideX, wallY1, sideDoorZ2 + 1, innerSideX, 18, sideDoorZ2 + 1, "white_concrete"),

    fillBedrock(minX, 6, minZ, minX, wallY2 + 2, minZ, "white_concrete"),
    fillBedrock(maxX, 6, minZ, maxX, wallY2 + 2, minZ, "white_concrete"),
    fillBedrock(minX, 6, maxZ, minX, wallY2 + 2, maxZ, "white_concrete"),
    fillBedrock(maxX, 6, maxZ, maxX, wallY2 + 2, maxZ, "white_concrete"),

    fillBedrock(minX - 3, roofBaseY, minZ - 3, maxX + 3, roofBaseY + 2, maxZ + 3, "smooth_quartz"),
    fillBedrock(minX - 4, roofBaseY + 3, minZ - 4, maxX + 4, roofBaseY + 3, maxZ + 4, trimBlock),
    fillBedrock(minX - 2, roofBaseY + 4, minZ - 2, maxX + 2, roofBaseY + 7, maxZ + 2, "white_concrete"),
    fillBedrock(minX + 7, roofBaseY + 8, minZ + 6, maxX - 7, roofBaseY + 10, maxZ - 6, color),
    fillBedrock(minX + 5, secondFloorY, minZ + 4, maxX - 5, secondFloorY, maxZ - 4, "smooth_quartz"),

    fillBedrock(pathX1, 5, sideDoorZ1, pathX2, 5, sideDoorZ2, "smooth_quartz"),
    fillBedrock(pathX1, 6, sideDoorZ1, pathX2, 6, sideDoorZ1, blocks.light),
    fillBedrock(pathX1, 6, sideDoorZ2, pathX2, 6, sideDoorZ2, blocks.light),

    fillBedrock(centerX - 8, 5, minZ - 8, centerX + 8, 5, minZ - 1, "smooth_quartz"),
    fillBedrock(centerX - 7, 6, minZ - 7, centerX + 7, 6, minZ - 7, blocks.light),
    fillBedrock(centerX - 5, 6, minZ - 1, centerX + 5, 17, minZ - 1, "glass"),
    fillBedrock(centerX - 9, 18, minZ - 1, centerX + 9, 19, minZ - 1, color),
    fillBedrock(minX + 2, 9, frontZ, minX + 5, 18, frontZ, color),
    fillBedrock(maxX - 5, 9, frontZ, maxX - 2, 18, frontZ, color),
    fillBedrock(innerSideX, 14, sideDoorZ1 + 1, innerSideX, 18, sideDoorZ1 + 3, color),
    fillBedrock(innerSideX, 14, sideDoorZ2 - 3, innerSideX, 18, sideDoorZ2 - 1, color),
    fillBedrock(outerSideX, 9, minZ + 9, outerSideX, 18, minZ + 12, color),
    fillBedrock(outerSideX, 9, maxZ - 12, outerSideX, 18, maxZ - 9, color),
    fillBedrock(minX + 7, 18, frontZ - 1, maxX - 7, 31, frontZ - 1, color),
    ...drawPixelTextMirrored(title, textStart, 23, frontZ - 2, "white_concrete"),
  );

  commands.push(
    fillBedrock(minX + 5, 6, maxZ - 14, minX + 25, secondFloorY + 4, maxZ - 5, "air"),
    fillBedrock(minX + 5, 5, maxZ - 14, minX + 25, 5, maxZ - 5, "oak_planks"),
    fillBedrock(minX + 20, secondFloorY, maxZ - 14, minX + 25, secondFloorY, maxZ - 5, "smooth_quartz"),
  );
  for (let step = 0; step <= secondFloorY - 7; step += 1) {
    commands.push(
      setBedrock(minX + 6 + step, 6 + step, maxZ - 9, smoothQuartzStairBlock(0)),
      setBedrock(minX + 6 + step, 6 + step, maxZ - 8, smoothQuartzStairBlock(0)),
    );
  }
  for (let y = 6; y <= secondFloorY + 2; y += 1) {
    commands.push(setBedrock(minX + 24, y, maxZ - 6, ladderBlock(3)));
  }

  commands.push(
    fillBedrock(innerSideX, 6, sideDoorZ1 + 1, innerSideX, 13, sideDoorZ2 - 1, "air"),
    fillBedrock(insideEntryX - 3, 6, sideDoorZ1 + 2, insideEntryX + 3, 9, sideDoorZ2 - 2, "air"),
    fillBedrock(centerX > 0 ? insideEntryX + 5 : insideEntryX - 9, 6, sideDoorZ1 + 2, centerX > 0 ? insideEntryX + 9 : insideEntryX - 5, 7, sideDoorZ2 - 2, "oak_planks"),
    setBedrock(insideEntryX, 8, -26, blocks.light),
    fillBedrock(minX + 5, 6, minZ + 7, minX + 13, 7, minZ + 11, color),
    fillBedrock(minX + 7, 8, minZ + 8, minX + 11, 8, minZ + 10, "white_concrete"),
    fillBedrock(maxX - 15, 6, minZ + 7, maxX - 7, 7, minZ + 11, "oak_planks"),
    fillBedrock(maxX - 14, 8, minZ + 8, maxX - 8, 8, minZ + 10, "white_concrete"),
    fillBedrock(minX + 4, 6, maxZ - 4, minX + 13, 12, maxZ - 4, "bookshelf"),
    fillBedrock(maxX - 13, 6, maxZ - 4, maxX - 4, 12, maxZ - 4, "bookshelf"),
    fillBedrock(centerX - 9, 6, minZ + 8, centerX + 9, 6, minZ + 14, title === "BLUE HQ" ? "blue_carpet" : "lime_carpet"),
    setBedrock(centerX - 3, 6, maxZ - 6, "chest"),
    setBedrock(centerX, 6, maxZ - 6, "crafting_table"),
    setBedrock(centerX + 3, 6, maxZ - 6, "furnace"),
    setBedrock(centerX - 7, 6, maxZ - 6, "barrel"),
    setBedrock(centerX + 7, 6, maxZ - 6, "barrel"),
    fillBedrock(centerX - 4, 6, loungeZ1, centerX + 4, 7, loungeZ2, "oak_planks"),
    fillBedrock(centerX - 3, 8, loungeZ1 + 1, centerX + 3, 8, loungeZ2 - 1, "oak_trapdoor"),
    setBedrock(centerX + 9, 8, maxZ - 8, "flower_pot"),
    setBedrock(centerX - 6, 6, loungeZ1 + 1, "oak_stairs"),
    setBedrock(centerX + 6, 6, loungeZ1 + 1, "oak_stairs"),
    setBedrock(centerX - 6, 6, loungeZ2 - 1, "oak_stairs"),
    setBedrock(centerX + 6, 6, loungeZ2 - 1, "oak_stairs"),
    setBedrock(centerX, 15, loungeZ2, blocks.light),
    setBedrock(centerX, 23, loungeZ2, blocks.light),
    fillBedrock(minX + 6, secondFloorY + 1, minZ + 7, minX + 16, secondFloorY + 2, minZ + 12, "oak_planks"),
    fillBedrock(maxX - 16, secondFloorY + 1, minZ + 7, maxX - 6, secondFloorY + 2, minZ + 12, color),
    fillBedrock(centerX - 7, secondFloorY + 1, minZ + 15, centerX + 7, secondFloorY + 1, minZ + 21, "white_carpet"),
    setBedrock(minX + 11, secondFloorY + 3, minZ + 9, "chest"),
    setBedrock(maxX - 11, secondFloorY + 3, minZ + 9, blocks.light),
    fillBedrock(centerX - 10, secondFloorY, minZ - 9, centerX + 10, secondFloorY, minZ - 4, "smooth_quartz"),
    fillBedrock(centerX - 11, secondFloorY + 1, minZ - 10, centerX + 11, secondFloorY + 2, minZ - 10, "glass"),
    fillBedrock(centerX - 11, secondFloorY + 1, minZ - 4, centerX + 11, secondFloorY + 2, minZ - 4, "glass"),
  );

  addDoubleDoorOnX(commands, innerSideX, 6, sideDoorZ1 + 4, sideDoorZ1 + 5, doorDirection);
  addWallArtOnZ(commands, centerX - 10, 10, maxZ - 1, color);
  addWallArtOnZ(commands, centerX - 10, secondFloorY + 4, maxZ - 1, color);
  for (let step = 0; step <= secondFloorY - 7; step += 1) {
    commands.push(
      setBedrock(minX + 6 + step, 6 + step, maxZ - 9, smoothQuartzStairBlock(0)),
      setBedrock(minX + 6 + step, 6 + step, maxZ - 8, smoothQuartzStairBlock(0)),
    );
  }
  for (let y = 6; y <= secondFloorY + 2; y += 1) {
    commands.push(setBedrock(minX + 24, y, maxZ - 6, ladderBlock(3)));
  }

  for (const [x, z, ceiling, drop] of [
    [centerX, sideDoorZ1 - 2, 18, 3],
    [centerX, minZ + 8, roofBaseY - 2, 3],
    [centerX - 11, loungeZ2, roofBaseY - 2, 3],
    [centerX + 11, loungeZ2, roofBaseY - 2, 3],
    [centerX, minZ - 5, secondFloorY - 2, 2],
  ] as const) {
    addHangingLantern(commands, x, ceiling, z, drop);
  }

  addFlagPole(commands, title === "BLUE HQ" ? minX + 8 : maxX - 8, minZ - 7, color, blocks.light);
}

function addGreenHqSecondFloorShell(commands: string[]): void {
  commands.push(
    fillBedrock(-121, 21, -50, -84, 31, -18, "air"),
    fillBedrock(-121, 20, -50, -84, 20, -31, "smooth_quartz"),
    fillBedrock(-121, 20, -20, -84, 20, -18, "smooth_quartz"),
    fillBedrock(-121, 20, -30, -118, 20, -21, "smooth_quartz"),
    fillBedrock(-102, 20, -30, -84, 20, -21, "smooth_quartz"),
    fillBedrock(-117, 20, -30, -103, 24, -21, "air"),
    fillBedrock(-102, 20, -30, -97, 20, -21, "smooth_quartz"),
    fillBedrock(-117, 21, -31, -97, 21, -31, "smooth_quartz"),
    fillBedrock(-117, 21, -20, -97, 21, -20, "smooth_quartz"),
    fillBedrock(-118, 21, -30, -118, 21, -21, "smooth_quartz"),
  );
}

function addGreenHqBedroom(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    "# Reference v25: GREEN HQ bedroom is a dedicated residence zone with clear walking space around the real beds",
    fillBedrock(-121, 21, -50, -103, 29, -38, "air"),
    fillBedrock(-121, 20, -50, -103, 20, -38, "oak_planks"),
    fillBedrock(-121, 21, -38, -103, 26, -38, "white_concrete"),
    fillBedrock(-115, 21, -38, -111, 24, -38, "air"),
    fillBedrock(-120, 20, -43, -117, 20, -41, "red_concrete"),

    setBedrock(-119, 21, -44, bedBlock(2, false)),
    setBedrock(-119, 21, -45, bedBlock(2, true)),
    setBedrock(-118, 21, -44, bedBlock(2, false)),
    setBedrock(-118, 21, -45, bedBlock(2, true)),
    fillBedrock(-118, 25, -42, -118, 27, -42, "chain"),
    setBedrock(-118, 24, -42, hangingLanternBlock()),

    fillBedrock(-105, 21, -49, -105, 23, -47, "bookshelf"),
    setBedrock(-106, 21, -46, "chest"),
    setBedrock(-106, 21, -44, "barrel"),
    setBedrock(-117, 27, -41, blocks.light),
  );
}

function addGreenHqCinema(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push(
    fillBedrock(-88, 21, -50, -88, 27, -44, "blackstone"),
    fillBedrock(-88, 22, -48, -88, 25, -46, "glowstone"),
    fillBedrock(-89, 21, -50, -89, 21, -44, "smooth_quartz"),
    fillBedrock(-89, 27, -50, -89, 27, -44, "smooth_quartz"),
    setBedrock(-90, 21, -47, "oak_stairs"),

    fillBedrock(-114, 24, -17, -92, 29, -17, "white_wool"),
    fillBedrock(-115, 23, -17, -91, 23, -17, "black_concrete"),
    fillBedrock(-115, 30, -17, -91, 30, -17, "black_concrete"),
    fillBedrock(-115, 23, -17, -115, 30, -17, "black_concrete"),
    fillBedrock(-91, 23, -17, -91, 30, -17, "black_concrete"),
    fillBedrock(-103, 23, -32, -101, 23, -30, "blackstone"),
    setBedrock(-102, 24, -31, "iron_block"),
    setBedrock(-102, 25, -31, blocks.light),
    fillBedrock(-112, 21, -37, -106, 21, -34, "lime_carpet"),
    fillBedrock(-98, 21, -37, -92, 21, -34, "lime_carpet"),
    setBedrock(-113, 21, -35, "oak_stairs"),
    setBedrock(-111, 21, -35, "oak_stairs"),
    setBedrock(-97, 21, -35, "oak_stairs"),
    setBedrock(-95, 21, -35, "oak_stairs"),
    setBedrock(-105, 27, -34, blocks.light),
  );
}

function addGreenHqGlassCurtain(commands: string[]): void {
  commands.push(
    fillBedrock(-116, 23, -54, -88, 31, -54, "glass"),
    fillBedrock(-117, 22, -54, -117, 32, -54, "white_concrete"),
    fillBedrock(-87, 22, -54, -87, 32, -54, "white_concrete"),
    fillBedrock(-116, 32, -54, -88, 32, -54, "white_concrete"),
    fillBedrock(-116, 22, -54, -88, 22, -54, "white_concrete"),
    fillBedrock(-121, 23, -49, -121, 30, -37, "glass"),
    fillBedrock(-121, 23, -32, -121, 30, -18, "glass"),
  );
}

function addGreenHqResidence(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v25: GREEN HQ second floor separates the residence bedroom from cinema props and uses realistic bed scale");

  addGreenHqSecondFloorShell(commands);
  addGreenHqBedroom(commands, blocks);
  addGreenHqCinema(commands, blocks);
  addGreenHqGlassCurtain(commands);

  addHangingLantern(commands, -116, 31, -38, 3);
  addHangingLantern(commands, -96, 31, -38, 3);
}

function addReferenceHeadquarters(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v24: HQs keep open stairwells and use separated interiors for precise room-level editing");
  addReferenceHq(commands, 82, 122, -54, -16, "blue_concrete", "BLUE HQ", blocks);
  addReferenceHq(commands, -122, -82, -54, -16, "lime_concrete", "GREEN HQ", blocks);
  addGreenHqResidence(commands, blocks);
  commands.push(
    fillBedrock(42, 1, -28, 78, 2, -18, "cyan_concrete"),
    fillBedrock(-78, 1, -28, -42, 2, -18, "lime_concrete"),
  );
}

function addReferenceHqEntryAccess(commands: string[]): void {
  commands.push("# Reference v20: exterior HQ entry stairs connect flat roads to raised double doors");
  commands.push(
    fillBedrock(73, 2, -31, 81, 8, -21, "air"),
    fillBedrock(73, 1, -31, 81, 1, -21, "stone"),
    fillBedrock(73, 2, -31, 81, 2, -21, "gray_concrete"),
    fillBedrock(74, 2, -30, 75, 2, -22, smoothQuartzStairBlock(0)),
    fillBedrock(76, 3, -30, 77, 3, -22, smoothQuartzStairBlock(0)),
    fillBedrock(78, 4, -30, 79, 4, -22, smoothQuartzStairBlock(0)),
    fillBedrock(80, 5, -30, 81, 5, -22, "smooth_quartz"),
    fillBedrock(-81, 2, -31, -73, 8, -21, "air"),
    fillBedrock(-81, 1, -31, -73, 1, -21, "stone"),
    fillBedrock(-81, 2, -31, -73, 2, -21, "gray_concrete"),
    fillBedrock(-75, 2, -30, -74, 2, -22, smoothQuartzStairBlock(1)),
    fillBedrock(-77, 3, -30, -76, 3, -22, smoothQuartzStairBlock(1)),
    fillBedrock(-79, 4, -30, -78, 4, -22, smoothQuartzStairBlock(1)),
    fillBedrock(-81, 5, -30, -80, 5, -22, "smooth_quartz"),
  );
}

function addReferenceLaserMaze(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: red glass LASER MAZE on the left-middle side");
  commands.push(
    fillBedrock(28, 1, -90, 76, 3, -50, "stone"),
    fillBedrock(32, 4, -86, 72, 24, -54, "red_stained_glass", "hollow"),
    fillBedrock(34, 25, -88, 70, 32, -88, "black_concrete"),
    ...drawPixelTextMirrored("LASER", 39, 26, -89, "white_concrete"),
  );
  for (let z = -80; z <= -58; z += 6) {
    commands.push(fillBedrock(36, 7, z, 68, 7, z, "red_stained_glass"), fillBedrock(36, 12, z + 2, 68, 12, z + 2, "red_stained_glass"));
  }
  for (let x = 38; x <= 66; x += 7) {
    commands.push(setBedrock(x, 4, -84, blocks.light), setBedrock(x, 4, -54, blocks.light));
  }
}

function addReferenceRoverSpeedway(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: right-middle rover speedway with layered race track");
  commands.push(
    fillBedrock(-100, 1, -86, -30, 3, -20, "stone"),
    fillBedrock(-94, 4, -80, -36, 4, -26, "black_concrete", "outline"),
    fillBedrock(-88, 4, -74, -42, 4, -32, "gray_concrete", "outline"),
    fillBedrock(-82, 4, -68, -48, 4, -38, "black_concrete", "outline"),
    fillBedrock(-76, 4, -62, -54, 4, -44, "gray_concrete", "outline"),
    fillBedrock(-94, 12, -84, -36, 31, -84, "black_concrete"),
    ...drawPixelTextMirrored("ROVER", -86, 17, -85, "white_concrete"),
    ...drawPixelTextMirrored("SPEED", -86, 24, -85, "white_concrete"),
  );
  for (const [x, z, color] of [
    [-88, -76, "yellow_concrete"],
    [-44, -72, "red_concrete"],
    [-48, -36, "yellow_concrete"],
    [-82, -42, "red_concrete"],
  ] as const) {
    commands.push(fillBedrock(x - 2, 5, z - 1, x + 2, 6, z + 1, color), setBedrock(x, 7, z, blocks.light));
  }
}

function addReferenceCrystalCave(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: front-right crystal cave with purple sign and clustered crystals");
  fillTiledBedrock(commands, -122, 1, 32, -54, 8, 98, "stone");
  commands.push(
    fillBedrock(-112, 1, 42, -64, 3, 88, "deepslate"),
    fillBedrock(-118, 12, 28, -72, 31, 28, "purple_concrete"),
    ...drawPixelTextMirrored("CRYSTAL", -115, 20, 27, "white_concrete"),
    fillBedrock(-80, 4, 31, -72, 18, 31, "blackstone"),
    fillBedrock(-104, 4, 31, -92, 19, 31, "blackstone"),
  );
  addBoxShell(commands, -118, 4, 36, -58, 26, 94, "blackstone");
  for (const [x, z, h] of [
    [-114, 52, 15],
    [-106, 80, 10],
    [-94, 44, 18],
    [-84, 72, 14],
    [-72, 54, 12],
    [-62, 86, 9],
  ] as const) {
    addCrystalCluster(commands, x, z, h, "amethyst_block", blocks.light);
  }
}

function addReferenceParkourCanyon(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: left-front cyan parkour canyon");
  fillTiledBedrock(commands, 54, 1, 18, 126, 7, 96, "stone");
  commands.push(
    fillBedrock(60, 1, 24, 120, 1, 90, "deepslate"),
    fillBedrock(100, 2, 28, 116, 2, 84, "black_concrete"),
    fillBedrock(72, 2, 34, 92, 2, 78, "black_concrete"),
  );
  for (const [x, z, w] of [
    [116, 82, 9],
    [104, 70, 7],
    [96, 58, 6],
    [86, 46, 6],
    [76, 34, 8],
    [66, 24, 7],
  ] as const) {
    commands.push(fillBedrock(x - w, 6, z - 2, x + w, 7, z + 2, "cyan_concrete"), fillBedrock(x - w + 2, 8, z - 1, x + w - 2, 8, z + 1, "white_concrete"));
  }
  addFlagPole(commands, 106, 18, "cyan_concrete", blocks.light);
}

function addReferenceFinalLaunch(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v14: rear final launch sign and secondary rocket");
  commands.push(
    fillBedrock(-76, 1, 78, -18, 6, 126, "stone"),
    fillBedrock(-70, 7, 84, -24, 9, 120, "light_gray_concrete"),
    fillBedrock(-62, 10, 92, -32, 13, 118, "white_concrete"),
    fillBedrock(-74, 14, 74, -22, 20, 74, "blue_concrete"),
    ...drawPixelTextMirrored("FINAL", -66, 17, 73, "white_concrete"),
    fillBedrock(-52, 10, 96, -46, 44, 102, "white_concrete"),
    fillBedrock(-51, 45, 97, -47, 50, 101, "orange_concrete"),
    fillBedrock(-62, 10, 88, -56, 32, 94, "iron_block"),
    fillBedrock(-44, 10, 88, -38, 32, 94, "iron_block"),
    setBedrock(-49, 51, 99, blocks.light),
  );
}

function addReferenceClouds(commands: string[]): void {
  commands.push("# Reference v14: blocky sky clouds for the preview silhouette");
  for (const [x, y, z, w] of [
    [-112, 62, -96, 9],
    [-70, 66, -118, 12],
    [-22, 63, -108, 8],
    [36, 67, -116, 11],
    [88, 64, -100, 10],
    [116, 66, -60, 8],
  ] as const) {
    commands.push(fillBedrock(x - w, y, z, x + w, y + 1, z + 4, "white_concrete"));
  }
}

function addReferenceMoonParkScene(commands: string[], blocks: MinecraftBlockSet): void {
  commands.push("# Reference v18: obstruction-free flat park build starts here");
  addCleanMoonTerrain(commands, blocks);
  addCleanParkRoadGrid(commands, blocks);
  addReferenceGate(commands, blocks);
  addReferenceHeadquarters(commands, blocks);
  addReferenceLaserMaze(commands, blocks);
  addReferenceRoverSpeedway(commands, blocks);
  addReferenceCrystalCave(commands, blocks);
  addReferenceFinalLaunch(commands, blocks);
  addCleanParkRoadGrid(commands, blocks);
  addReferenceRocket(commands, blocks);
  addReferenceHqEntryAccess(commands);
}

export function buildBedrockThemeParkFunction(config: PlanConfig): string {
  const theme = themes.find((item) => item.id === config.themeId) ?? themes.find((item) => item.id === "moon-base") ?? themes[0];
  if (!theme) {
    throw new Error("No themes are configured.");
  }
  const blocks = minecraftBlocksByTheme[theme.id] ?? minecraftBlocksByTheme["moon-base"];
  if (!blocks) {
    throw new Error(`Missing Minecraft blocks for theme ${theme.id}.`);
  }

  const commands: string[] = [
    `# Kids Map Tool Bedrock Theme Park: ${theme.kidTitle}`,
    "# Import the .mcpack, apply it to a creative Bedrock world with cheats enabled, then run /function build.",
    "gamerule commandblockoutput false",
    "gamerule sendcommandfeedback false",
    "time set day",
    "weather clear",
    tellraw("§bKids Map Tool: 正在生成大型月亮基地主题乐园..."),
  ];

  clearLargeBedrockPark(commands);
  addReferenceMoonParkScene(commands, blocks);

  commands.push(
    "# Finish",
    "tp @p ~ ~36 ~-218",
    "spawnpoint @p ~ ~36 ~-218",
    "effect @a speed 20 1 true",
    "effect @a night_vision 600 1 true",
    "give @p minecart 1",
    "give @p cookie 8",
    "title @a title §bSPACE X 车行入口 v31 完成",
    "title @a subtitle §e运行 /function start 查看玩法",
    tellraw("§aReference v31 已生成。入口改成 SpaceX 风格黑色车行大门，主路和环路已扩大为车辆尺度。"),
    tellraw("§e如果看不清或卡住，运行：/function rescue"),
    tellraw("§e下一步运行：/function start"),
  );

  return `${commands.join("\n")}\n`;
}

export function buildBedrockStartFunction(): string {
  return [
    "# Kids Map Tool Bedrock play instructions",
    "title @a title §b月亮基地 SPACE X 入口 v31",
    "title @a subtitle §e沿 37 格宽车行路网游玩，不要穿过建筑",
    tellraw("§b玩法路线："),
    tellraw("§f1. 从 SpaceX 风格黑色大门进入，沿中间 37 格宽车行主路走。"),
    tellraw("§f2. 到中央火箭广场，不要穿过火箭底座，走广场环路。"),
    tellraw("§f3. 沿 29 格宽外环路去蓝绿 HQ、激光迷宫、月球车道和水晶洞。"),
    tellraw("§f4. 沿南侧环路到 FINAL LAUNCH 二号火箭区。"),
    tellraw("§f5. 回到中央广场，站到钻石块上宣布发射成功。"),
    "give @p minecart 1",
    "give @p cookie 8",
    "effect @p night_vision 600 1 true",
    "",
  ].join("\n");
}

export function buildBedrockRescueFunction(): string {
  return [
    "# Lift the player safely above the current position.",
    "gamemode creative @p",
    "tp @p ~ ~18 ~",
    "effect @p slow_falling 12 1 true",
    "effect @p night_vision 300 1 true",
    "title @p title §b已抬高视角",
    tellraw("§b你已经被传送到当前位置上方。往下看，找到 SpaceX 风格黑色大门、车行环路或中央火箭。"),
    "",
  ].join("\n");
}

export function buildBedrockClearFunction(): string {
  const commands = [
    "# Clear the large generated park around your current position.",
    "gamerule commandblockoutput false",
  ];
  clearLargeBedrockPark(commands);
  fillTiledBedrock(commands, -212, -1, -232, 212, -1, -6, "grass_block");
  fillTiledBedrock(commands, -212, -1, -5, 212, -1, 196, "grass_block");
  commands.push(
    "tp @p ~ ~6 ~",
    "effect @p slow_falling 8 1 true",
    "title @a title §c乐园已清理",
    tellraw("§cKids Map Tool: 当前中心周围的大型乐园区域已清理。"),
    "",
  );
  return commands.join("\n");
}
