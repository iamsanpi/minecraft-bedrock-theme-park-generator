const themes = [
  {
    id: "volcano-security",
    title: "火山安全岛",
    short: "火山岛",
    colors: ["#f97316", "#111827", "#e5e7eb", "#22c55e"],
    blocks: ["smooth_quartz", "blue_concrete", "lime_concrete", "glass", "iron_bars", "redstone_lamp"],
    story: "岩浆岛快要喷发了，两个小队友要把宝石安全送进基地。",
    danger: "岩浆倒计时",
  },
  {
    id: "candy-village",
    title: "糖果救援村",
    short: "糖果村",
    colors: ["#f9a8d4", "#fde047", "#ffffff", "#86efac"],
    blocks: ["pink_concrete", "yellow_concrete", "white_wool", "oak_planks", "lantern", "flower_pot"],
    story: "糖果村的门被怪物堵住了，今天要修一条安全小路。",
    danger: "软软怪物门",
  },
  {
    id: "moon-base",
    title: "月亮基地发射",
    short: "月亮基地",
    colors: ["#f8fafc", "#94a3b8", "#22d3ee", "#111827"],
    blocks: ["cobblestone", "stone_bricks", "white_concrete", "cyan_concrete", "glass", "sea_lantern", "iron_block"],
    story: "月亮基地收到求救信号，需要造火箭、通道和控制室。",
    danger: "陨石时间",
  },
  {
    id: "underwater-castle",
    title: "海底城堡",
    short: "海底城堡",
    colors: ["#0ea5e9", "#14b8a6", "#bfdbfe", "#facc15"],
    blocks: ["prismarine", "sea_lantern", "blue_stained_glass", "sandstone", "kelp", "coral_block"],
    story: "海底城堡丢了珍珠，要从透明隧道找到宝藏房。",
    danger: "巡逻怪",
  },
];

const modules = [
  {
    id: "safe-house",
    title: "双人安全屋",
    mini: "基地",
    icon: "house",
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
    mini: "边界",
    icon: "ring",
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
    mini: "机关",
    icon: "laser",
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
    mini: "隧道",
    icon: "tunnel",
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
    mini: "宝藏",
    icon: "treasure",
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
    mini: "跳跳",
    icon: "steps",
    kidAction: "选择简单、中等或勇敢三个跳跃距离。",
    parentTip: "小朋友版本优先 1 格间距，不要用失败惩罚，下面铺水或软垫色块。",
    commands: {
      "java-worldedit": ["//stack 8 east", "//replace air slime_block"],
      bedrock: ["/setblock ~ ~ ~ stone", "/setblock ~2 ~ ~ stone", "/setblock ~4 ~ ~ slime"],
      "no-commands": ["每隔 1 到 2 格放一个台阶，下面铺绿色软垫。"],
    },
  },
];

const rewards = ["宝箱里放钻石", "给基地插旗子", "做一张合影截图", "给今天的地图起名字", "加一只宠物守卫"];
const sizeLabel = {
  tiny: "20 分钟小地图",
  cozy: "一晚可以完成",
  big: "周末大型地图",
};
const defaultState = {
  themeId: "moon-base",
  size: "big",
  edition: "bedrock",
  moduleIds: ["safe-house", "lava-moat", "laser-hall", "secret-tunnel", "treasure-room", "parkour-steps"],
  gentleMode: true,
};
const stateKey = "minecraft-kids-map-tool-state-v2";

const savedState = JSON.parse(localStorage.getItem(stateKey) || "null");
const state = { ...defaultState, ...(savedState || {}) };

const progressKey = "minecraft-kids-map-tool-progress";
const savedProgress = new Set(JSON.parse(localStorage.getItem(progressKey) || "[]"));

const minecraftAssetBlockAliases = {
  grass_block: "grass",
  iron_chain: "chain",
  oak_trapdoor: "trapdoor",
  sea_lantern: "seaLantern",
};

const minecraftAssetFallbackTextureAliases = {
  sea_lantern: "sea_lantern",
};

const minecraftAssetTexturePathAliases = {
  "textures/blocks/grass_side": "textures/blocks/grass_top",
};

const boxMaterialFaces = ["east", "west", "up", "down", "south", "north"];

const themeGrid = document.querySelector("#themeGrid");
const moduleGrid = document.querySelector("#moduleGrid");
const currentPick = document.querySelector("#currentPick");
const currentHint = document.querySelector("#currentHint");
const mapPreview = document.querySelector("#mapPreview");
const planTitle = document.querySelector("#planTitle");
const missionText = document.querySelector("#missionText");
const paletteRow = document.querySelector("#paletteRow");
const parkRoute = document.querySelector("#parkRoute");
const taskList = document.querySelector("#taskList");
const rewardText = document.querySelector("#rewardText");
const gentleMode = document.querySelector("#gentleMode");
const editionSelect = document.querySelector("#editionSelect");
const parentNotes = document.querySelector("#parentNotes");
const commandOutput = document.querySelector("#commandOutput");
const copyButton = document.querySelector("#copyButton");
const speakButton = document.querySelector("#speakButton");
const resetButton = document.querySelector("#resetButton");
const randomizeButton = document.querySelector("#randomizeButton");
const jumpModules = document.querySelector("#jumpModules");
const jumpResult = document.querySelector("#jumpResult");
const jumpParent = document.querySelector("#jumpParent");
const jumpResultFromModules = document.querySelector("#jumpResultFromModules");
const exportBedrockPack = document.querySelector("#exportBedrockPack");
const downloadBedrockPack = document.querySelector("#downloadBedrockPack");
const exportStatus = document.querySelector("#exportStatus");
const refreshPreview = document.querySelector("#refreshPreview");
const voxelCanvas = document.querySelector("#voxelCanvas");
const voxelStage = document.querySelector("#voxelStage");
const voxelStatus = document.querySelector("#voxelStatus");
const previewMetrics = document.querySelector("#previewMetrics");
const blockLegend = document.querySelector("#blockLegend");
const layerActions = document.querySelector("#layerActions");
const materialBoard = document.querySelector("#materialBoard");
const componentLibrary = document.querySelector("#componentLibrary");
const structureAudit = document.querySelector("#structureAudit");
const blueprintAudit = document.querySelector("#blueprintAudit");

const blockStyles = {
  smooth_quartz: { color: "#f4f0e7", pattern: "quartz" },
  quartz_block: { color: "#f4f0e7", pattern: "quartz" },
  quartz_pillar: { color: "#eee7db", pattern: "quartz" },
  white_concrete: { color: "#f8fafc", pattern: "concrete" },
  light_gray_concrete: { color: "#aeb7c2", pattern: "concrete" },
  gray_concrete: { color: "#6b7280", pattern: "concrete" },
  cobblestone: { color: "#777d82", pattern: "cobblestone" },
  stone_bricks: { color: "#7f858a", pattern: "bricks" },
  stone: { color: "#858b90", pattern: "stone" },
  smooth_stone: { color: "#a3a3a3", pattern: "smooth_stone" },
  deepslate: { color: "#3f4650", pattern: "bricks" },
  blackstone: { color: "#252734", pattern: "bricks" },
  black_concrete: { color: "#151923", pattern: "concrete" },
  blue_concrete: { color: "#2457d6", pattern: "concrete" },
  cyan_concrete: { color: "#11bfd0", pattern: "concrete" },
  lime_concrete: { color: "#56c933", pattern: "concrete" },
  green_concrete: { color: "#208343", pattern: "concrete" },
  red_concrete: { color: "#be3030", pattern: "concrete" },
  orange_concrete: { color: "#f07c24", pattern: "concrete" },
  yellow_concrete: { color: "#f4c430", pattern: "concrete" },
  purple_concrete: { color: "#6d3bbf", pattern: "concrete" },
  pink_concrete: { color: "#ee87b7" },
  white_wool: { color: "#f1f5f9" },
  lime_wool: { color: "#84cc16" },
  oak_planks: { color: "#b9854f" },
  sandstone: { color: "#d9c58c" },
  prismarine: { color: "#5fb7ad" },
  moss_block: { color: "#6b8f45", pattern: "stone" },
  oak_log: { color: "#8b5a2b", pattern: "bricks" },
  oak_leaves: { color: "#2f7d32", opacity: 0.76 },
  cherry_leaves: { color: "#f9a8d4", opacity: 0.8 },
  grass_block: { color: "#5e9e3e" },
  dirt: { color: "#8b5a2b" },
  glass: { color: "#b7f3ff", opacity: 0.38 },
  red_stained_glass: { color: "#ef4444", opacity: 0.44 },
  blue_stained_glass: { color: "#60a5fa", opacity: 0.44 },
  pink_stained_glass: { color: "#f9a8d4", opacity: 0.44 },
  sea_lantern: { color: "#d8fff5", emissive: "#8dfce9" },
  redstone_lamp: { color: "#f59e0b", emissive: "#f97316" },
  lantern: { color: "#f8e3a0", emissive: "#fbbf24" },
  soul_lantern: { color: "#77e6ff", emissive: "#38bdf8" },
  chain: { color: "#525866", metalness: 0.24 },
  iron_chain: { color: "#525866", metalness: 0.24 },
  glowstone: { color: "#f8dc6f", emissive: "#fde047" },
  iron_block: { color: "#d1d5db", metalness: 0.2 },
  gold_block: { color: "#f6c945", metalness: 0.18 },
  diamond_block: { color: "#54d6e7", emissive: "#0891b2" },
  emerald_block: { color: "#22c55e", emissive: "#15803d" },
  amethyst_block: { color: "#8b5cf6", emissive: "#6d28d9" },
  rail: { color: "#4b5563", metalness: 0.2 },
  slime: { color: "#8be05f", opacity: 0.62 },
  slime_block: { color: "#8be05f", opacity: 0.62 },
  water: { color: "#2563eb", opacity: 0.55 },
  lava: { color: "#f97316", emissive: "#ea580c" },
  chest: { color: "#9a5a23" },
  bed: { color: "#b91c1c" },
  barrel: { color: "#8a5a32", pattern: "bricks" },
  bookshelf: { color: "#9c6b32", pattern: "bricks" },
  crafting_table: { color: "#a86f3d", pattern: "bricks" },
  furnace: { color: "#60666d", pattern: "stone" },
  oak_trapdoor: { color: "#a97142", pattern: "bricks" },
  oak_stairs: { color: "#b9854f", pattern: "bricks" },
  flower_pot: { color: "#a44a2a" },
  white_carpet: { color: "#f8fafc" },
  blue_carpet: { color: "#2457d6" },
  lime_carpet: { color: "#56c933" },
  stone_pressure_plate: { color: "#9ca3af" },
  air: { color: "#000000", opacity: 0 },
};

const cameraPresets = {
  poster: { position: [0, 124, -392], target: [0, 34, -96] },
  top: { position: [0, 330, 0.1], target: [0, -8, -18] },
  rocket: { position: [88, 132, 92], target: [-8, 68, -12] },
  gate: { position: [0, 72, -344], target: [0, 40, -226] },
  gateLogo: { position: [0, 52, -262], target: [0, 52, -184] },
  gateBack: { position: [-166, 28, -156], target: [-58, 13, -140] },
  greenHqBedroom: { position: [-112, 23, -41], target: [-118.5, 20.1, -44.5] },
  gateLantern: { position: [-20, 58, -228], target: [42, 34, -178] },
};

const layerFilters = [
  { id: "all", label: "全景" },
  { id: "terrain", label: "岩层" },
  { id: "route", label: "车行路网" },
  { id: "building", label: "建筑" },
  { id: "glass", label: "玻璃" },
  { id: "light", label: "灯光" },
];

const materialFamilies = [
  {
    title: "月面岩层",
    blocks: ["cobblestone", "stone", "stone_bricks", "deepslate", "blackstone"],
  },
  {
    title: "入口与车道",
    blocks: ["gray_concrete", "smooth_stone", "yellow_concrete", "white_concrete", "black_concrete"],
  },
  {
    title: "蓝白导视",
    blocks: ["cyan_concrete", "diamond_block", "blue_concrete", "sea_lantern"],
  },
  {
    title: "主题建筑",
    blocks: ["blue_concrete", "lime_concrete", "iron_block", "black_concrete"],
  },
  {
    title: "室内家具",
    blocks: ["oak_planks", "bed", "white_wool", "lime_wool", "bookshelf", "chest", "crafting_table", "furnace", "barrel", "oak_trapdoor", "oak_stairs"],
  },
  {
    title: "照明细节",
    blocks: ["chain", "lantern", "sea_lantern", "glowstone", "white_carpet", "blue_carpet", "lime_carpet"],
  },
  {
    title: "花园点缀",
    blocks: ["moss_block", "oak_log", "cherry_leaves", "red_stained_glass", "amethyst_block"],
  },
];

const componentDefinitions = [
  {
    id: "gate",
    label: "SpaceX 风格车行大门",
    layer: "building",
    box: { minX: -196, minY: 0, minZ: -224, maxX: 196, maxY: 62, maxZ: -116 },
    footprint: "393 x 109",
    height: 63,
    camera: { position: [0, 72, -344], target: [0, 40, -226] },
  },
  {
    id: "runway",
    label: "37 格宽入口车道",
    layer: "route",
    box: { minX: -22, minY: -1, minZ: -226, maxX: 22, maxY: 2, maxZ: 172 },
    footprint: "45 x 399",
    height: 4,
    camera: { position: [-76, 66, -222], target: [0, 2, -58] },
  },
  {
    id: "rocket",
    label: "Starship 风格中央火箭",
    layer: "building",
    box: { minX: -56, minY: 0, minZ: -62, maxX: 56, maxY: 142, maxZ: 40 },
    footprint: "113 x 103",
    height: 143,
    camera: { position: [88, 132, 92], target: [-8, 68, -12] },
  },
  {
    id: "blue-hq",
    label: "蓝队可进入别墅",
    layer: "building",
    box: { minX: 77, minY: 0, minZ: -62, maxX: 127, maxY: 35, maxZ: -11 },
    footprint: "51 x 52",
    height: 36,
    camera: { position: [48, 42, -82], target: [100, 14, -32] },
  },
  {
    id: "green-hq",
    label: "绿队可进入别墅",
    layer: "building",
    box: { minX: -127, minY: 0, minZ: -62, maxX: -77, maxY: 35, maxZ: -11 },
    footprint: "51 x 52",
    height: 36,
    camera: { position: [-48, 42, -82], target: [-100, 14, -32] },
  },
  {
    id: "laser",
    label: "红玻璃激光迷宫",
    layer: "glass",
    box: { minX: 36, minY: 0, minZ: -94, maxX: 90, maxY: 22, maxZ: -44 },
    footprint: "55 x 51",
    height: 23,
    camera: { position: [106, 42, -128], target: [62, 8, -68] },
  },
  {
    id: "rover",
    label: "月球车赛道",
    layer: "route",
    box: { minX: 36, minY: 0, minZ: 30, maxX: 106, maxY: 11, maxZ: 104 },
    footprint: "71 x 75",
    height: 12,
    camera: { position: [126, 46, 122], target: [70, 4, 70] },
  },
  {
    id: "crystal",
    label: "紫色水晶洞",
    layer: "building",
    box: { minX: -112, minY: 0, minZ: 32, maxX: -46, maxY: 34, maxZ: 108 },
    footprint: "67 x 77",
    height: 35,
    camera: { position: [-136, 48, 120], target: [-78, 12, 70] },
  },
];

const previewState = {
  three: null,
  OrbitControls: null,
  renderer: null,
  scene: null,
  camera: null,
  controls: null,
  animationFrame: 0,
  resizeObserver: null,
  pendingTimer: 0,
  currentPreset: "poster",
  currentLayer: "all",
  model: null,
  serverData: null,
  focusedComponent: "",
  assetPack: null,
  assetLoadPromise: null,
  assetTextureLoader: null,
  assetError: "",
};

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function jumpTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildPlan() {
  const theme = themes.find((item) => item.id === state.themeId) || themes[0];
  const selectedModules = state.moduleIds
    .map((id) => modules.find((item) => item.id === id))
    .filter(Boolean);
  const activeModules = selectedModules.length ? selectedModules : modules.slice(0, 3);
  const danger = state.gentleMode ? "安全版机关" : theme.danger;

  return {
    theme,
    modules: activeModules,
    title: `${theme.title} - ${sizeLabel[state.size]}`,
    mission: `${theme.story} 今天的危险元素是 ${danger}，目标是完成 ${activeModules.length} 个小任务。`,
    commands: activeModules.flatMap((item) => item.commands[state.edition]),
    parentNotes: activeModules.map((item) => `${item.title}: ${item.parentTip}`),
  };
}

function renderThemes() {
  themeGrid.innerHTML = themes
    .map((theme) => {
      const active = theme.id === state.themeId ? " active" : "";
      const swatches = theme.colors.map((color) => `<i style="background:${color}"></i>`).join("");
      return `
        <button class="theme-card${active}" type="button" data-theme="${theme.id}">
          <span class="mini-map" aria-hidden="true">${swatches}</span>
          <strong>${theme.short}</strong>
          <small>${theme.title}</small>
        </button>
      `;
    })
    .join("");
}

function renderModules() {
  moduleGrid.innerHTML = modules
    .map((module) => {
      const active = state.moduleIds.includes(module.id) ? " active" : "";
      return `
        <button class="module-card${active}" type="button" data-module="${module.id}">
          <span class="module-icon ${module.icon}" aria-hidden="true"></span>
          <strong>${module.title}</strong>
          <small>${module.kidAction}</small>
        </button>
      `;
    })
    .join("");
}

function renderPreview(plan) {
  const cells = [
    { label: "跳跳陨石坑", active: true },
    { label: "入口大门", active: true },
    { label: "激光迷宫", active: true },
    { label: "双人总部", active: true },
    { label: "中央火箭", active: true },
    { label: "月球车道", active: true },
    { label: "水晶洞", active: true },
    { label: "主路广场", active: true },
    { label: "最终发射", active: true },
  ];

  mapPreview.innerHTML = cells
    .map((cell, index) => {
      const active = cell.active ? " active" : "";
      return `<div class="preview-cell${active}" style="--cell:${plan.theme.colors[index % plan.theme.colors.length]}">${cell.label}</div>`;
    })
    .join("");
}

function renderPlan() {
  const plan = buildPlan();
  renderThemes();
  renderModules();
  renderPreview(plan);
  scheduleVoxelPreview();

  planTitle.textContent = plan.title;
  missionText.textContent = plan.mission;
  currentPick.textContent = `已选：${plan.theme.title}`;
  currentHint.textContent = `下一步：选择机关，或直接查看 ${plan.modules.length} 个地图任务。`;
  rewardText.textContent = rewards[(state.moduleIds.length + themes.findIndex((item) => item.id === state.themeId)) % rewards.length];
  gentleMode.checked = state.gentleMode;
  editionSelect.value = state.edition;
  document.querySelectorAll("[data-size]").forEach((item) => item.classList.toggle("active", item.dataset.size === state.size));

  paletteRow.innerHTML = plan.theme.blocks
    .map((block, index) => `<span style="--swatch:${plan.theme.colors[index % plan.theme.colors.length]}">${block}</span>`)
    .join("");
  parkRoute.innerHTML = [
    "从 SpaceX 风格黑色车行大门进场，沿 37 格宽入口车道走。",
    "到中央巨型火箭广场，沿 29 格宽外环路连接各街区。",
    "去左上角跳跳陨石坑，踩到钻石/软垫平台。",
    "去右上角激光穹顶迷宫，找到绿宝石出口。",
    "去左下角水晶山洞，沿紫色路找到水晶柱。",
    "去右下角月球车道，坐/推矿车绕维修站一圈。",
    "回最终发射区，站到钻石块上完成发射结局。",
  ]
    .map((item) => `<li>${item}</li>`)
    .join("");

  taskList.innerHTML = plan.modules
    .map((module, index) => {
      const checked = savedProgress.has(module.id) ? "checked" : "";
      return `
        <label class="task-item">
          <input type="checkbox" data-progress="${module.id}" ${checked} />
          <span class="task-number">${index + 1}</span>
          <span><strong>${module.title}</strong><small>${module.kidAction}</small></span>
        </label>
      `;
    })
    .join("");

  parentNotes.innerHTML = plan.parentNotes.map((note) => `<li>${note}</li>`).join("");
  commandOutput.textContent = plan.commands.join("\n");
}

function persistProgress() {
  localStorage.setItem(progressKey, JSON.stringify([...savedProgress]));
}

function currentConfig() {
  return {
    themeId: state.themeId,
    size: state.size,
    edition: state.edition,
    moduleIds: state.moduleIds,
    gentleMode: state.gentleMode,
  };
}

function setExportStatus(message, tone = "info") {
  exportStatus.textContent = message;
  exportStatus.dataset.tone = tone;
}

function setVoxelStatus(message, tone = "info") {
  voxelStatus.textContent = message;
  voxelStatus.dataset.tone = tone;
}

function normalizeBlockName(block) {
  return String(block || "")
    .replace(/^minecraft:/, "")
    .replace(/\[.*$/, "")
    .trim();
}

function parseBlockState(block) {
  const stateMatch = String(block || "").match(/\[(.*)\]$/);
  if (!stateMatch) return {};
  const stateText = stateMatch[1] || "";
  const state = {};
  for (const entry of stateText.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)) {
    const [rawKey, rawValue] = entry.split("=");
    const key = String(rawKey || "").trim().replace(/^"|"$/g, "");
    const value = String(rawValue || "").trim().replace(/^"|"$/g, "");
    if (!key) continue;
    if (value === "true") {
      state[key] = true;
    } else if (value === "false") {
      state[key] = false;
    } else if (/^-?\d+$/.test(value)) {
      state[key] = Number(value);
    } else {
      state[key] = value;
    }
  }
  return state;
}

function canonicalMinecraftAssetBlock(block) {
  const normalized = normalizeBlockName(block);
  return minecraftAssetBlockAliases[normalized] || normalized;
}

function stripJsonComments(source) {
  return String(source || "")
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("//"))
    .join("\n");
}

async function loadMinecraftAssetPack() {
  if (previewState.assetLoadPromise) return previewState.assetLoadPromise;
  previewState.assetLoadPromise = (async () => {
    try {
      const [blocksResponse, terrainResponse] = await Promise.all([
        fetch("/minecraft-assets/blocks.json"),
        fetch("/minecraft-assets/textures/terrain_texture.json"),
      ]);
      if (!blocksResponse.ok || !terrainResponse.ok) {
        throw new Error("本机还没有同步 Bedrock vanilla 资源");
      }
      const [blocksText, terrainText] = await Promise.all([blocksResponse.text(), terrainResponse.text()]);
      previewState.assetPack = {
        blocks: JSON.parse(blocksText),
        terrain: JSON.parse(stripJsonComments(terrainText)),
      };
      previewState.assetError = "";
    } catch (error) {
      previewState.assetPack = null;
      previewState.assetError = error instanceof Error ? error.message : "Bedrock 资源加载失败";
    }
    return previewState.assetPack;
  })();
  return previewState.assetLoadPromise;
}

function firstTexturePath(textureValue) {
  if (!textureValue) return "";
  if (typeof textureValue === "string") return textureValue;
  if (Array.isArray(textureValue)) return firstTexturePath(textureValue[0]);
  if (typeof textureValue === "object") return textureValue.path || "";
  return "";
}

function texturePathForAlias(alias) {
  const terrainData = previewState.assetPack?.terrain?.texture_data;
  if (!terrainData || !alias) return "";
  const path = firstTexturePath(terrainData[alias]?.textures);
  return minecraftAssetTexturePathAliases[path] ?? path;
}

function textureAliasForFace(textureSpec, face) {
  if (!textureSpec) return "";
  if (typeof textureSpec === "string") return textureSpec;
  if (typeof textureSpec !== "object" || Array.isArray(textureSpec)) return "";
  if (textureSpec[face]) return textureSpec[face];
  if (["north", "south", "east", "west"].includes(face) && textureSpec.side) return textureSpec.side;
  return textureSpec["*"] || "";
}

function assetTexturePathsForBlock(block) {
  if (!previewState.assetPack) return null;
  const normalized = normalizeBlockName(block);
  const canonical = canonicalMinecraftAssetBlock(normalized);
  const blockEntry = previewState.assetPack.blocks?.[canonical];
  const fallbackAlias = minecraftAssetFallbackTextureAliases[normalized];
  const facePaths = {};

  for (const face of ["up", "down", "north", "south", "east", "west"]) {
    const alias = textureAliasForFace(blockEntry?.textures, face) || fallbackAlias || (previewState.assetPack.terrain?.texture_data?.[canonical] ? canonical : "");
    const path = texturePathForAlias(alias);
    if (path) facePaths[face] = path;
  }

  return Object.keys(facePaths).length ? facePaths : null;
}

function textureRenderHints(block) {
  const normalized = normalizeBlockName(block);
  const transparent =
    normalized.includes("glass") ||
    normalized.includes("leaves") ||
    normalized.includes("lantern") ||
    normalized.includes("chain") ||
    normalized.includes("trapdoor") ||
    normalized.includes("flower");
  return {
    transparent,
    alphaTest: normalized.includes("glass") ? 0.04 : transparent ? 0.12 : 0,
    doubleSided: normalized.includes("chain") || normalized.includes("lantern") || normalized.includes("flower"),
  };
}

function parseRelativeCoord(token) {
  const raw = String(token || "").trim();
  if (raw === "~") return 0;
  if (raw.startsWith("~")) {
    const value = raw.slice(1);
    return value ? Number(value) : 0;
  }
  return Number(raw);
}

function addCuboid(list, x1, y1, z1, x2, y2, z2, block, state = {}) {
  if (![x1, y1, z1, x2, y2, z2].every(Number.isFinite)) return;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);
  if (minX > maxX || minY > maxY || minZ > maxZ) return;
  list.push({ minX, minY, minZ, maxX, maxY, maxZ, block, state });
}

function subtractBoxFromCuboid(item, box) {
  if (!cuboidIntersectsBox(item, box)) return [item];
  const ix1 = Math.max(item.minX, box.minX);
  const ix2 = Math.min(item.maxX, box.maxX);
  const iy1 = Math.max(item.minY, box.minY);
  const iy2 = Math.min(item.maxY, box.maxY);
  const iz1 = Math.max(item.minZ, box.minZ);
  const iz2 = Math.min(item.maxZ, box.maxZ);
  const pieces = [];
  const push = (minX, minY, minZ, maxX, maxY, maxZ) => {
    if (minX <= maxX && minY <= maxY && minZ <= maxZ) {
      pieces.push({ minX, minY, minZ, maxX, maxY, maxZ, block: item.block, state: item.state });
    }
  };

  push(item.minX, item.minY, item.minZ, ix1 - 1, item.maxY, item.maxZ);
  push(ix2 + 1, item.minY, item.minZ, item.maxX, item.maxY, item.maxZ);
  push(ix1, item.minY, item.minZ, ix2, item.maxY, iz1 - 1);
  push(ix1, item.minY, iz2 + 1, ix2, item.maxY, item.maxZ);
  push(ix1, item.minY, iz1, ix2, iy1 - 1, iz2);
  push(ix1, iy2 + 1, iz1, ix2, item.maxY, iz2);
  return pieces;
}

function removeBoxFromCuboids(list, minX, minY, minZ, maxX, maxY, maxZ) {
  const box = { minX, minY, minZ, maxX, maxY, maxZ };
  const next = [];
  for (const item of list) next.push(...subtractBoxFromCuboid(item, box));
  list.length = 0;
  list.push(...next);
}

function addReplacingCuboid(list, x1, y1, z1, x2, y2, z2, block, state = {}) {
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);
  removeBoxFromCuboids(list, minX, minY, minZ, maxX, maxY, maxZ);
  addCuboid(list, minX, minY, minZ, maxX, maxY, maxZ, block, state);
}

function addHollowCuboids(list, minX, minY, minZ, maxX, maxY, maxZ, block) {
  addCuboid(list, minX, minY, minZ, maxX, minY, maxZ, block);
  if (maxY > minY) addCuboid(list, minX, maxY, minZ, maxX, maxY, maxZ, block);
  if (maxY - minY > 1) {
    addCuboid(list, minX, minY + 1, minZ, maxX, maxY - 1, minZ, block);
    if (maxZ > minZ) addCuboid(list, minX, minY + 1, maxZ, maxX, maxY - 1, maxZ, block);
    if (maxX > minX && maxZ - minZ > 1) addCuboid(list, minX, minY + 1, minZ + 1, minX, maxY - 1, maxZ - 1, block);
    if (maxX > minX && maxZ - minZ > 1) addCuboid(list, maxX, minY + 1, minZ + 1, maxX, maxY - 1, maxZ - 1, block);
  }
}

function addOutlineCuboids(list, minX, minY, minZ, maxX, maxY, maxZ, block) {
  const y1 = minY;
  const y2 = maxY;
  addCuboid(list, minX, y1, minZ, maxX, y1, minZ, block);
  addCuboid(list, minX, y1, maxZ, maxX, y1, maxZ, block);
  addCuboid(list, minX, y1, minZ, minX, y1, maxZ, block);
  addCuboid(list, maxX, y1, minZ, maxX, y1, maxZ, block);
  if (y2 > y1) {
    addCuboid(list, minX, y2, minZ, maxX, y2, minZ, block);
    addCuboid(list, minX, y2, maxZ, maxX, y2, maxZ, block);
    addCuboid(list, minX, y2, minZ, minX, y2, maxZ, block);
    addCuboid(list, maxX, y2, minZ, maxX, y2, maxZ, block);
    addCuboid(list, minX, y1, minZ, minX, y2, minZ, block);
    addCuboid(list, maxX, y1, minZ, maxX, y2, minZ, block);
    addCuboid(list, minX, y1, maxZ, minX, y2, maxZ, block);
    addCuboid(list, maxX, y1, maxZ, maxX, y2, maxZ, block);
  }
}

function parseBedrockPreviewCommands(commandText) {
  const cuboids = [];
  const blockCounts = new Map();
  let fillCount = 0;
  let setblockCount = 0;
  let skippedAir = 0;
  const bounds = { minX: Infinity, minY: Infinity, minZ: Infinity, maxX: -Infinity, maxY: -Infinity, maxZ: -Infinity };

  for (const rawLine of String(commandText || "").split("\n")) {
    const line = rawLine.trim().replace(/^\//, "");
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/\s+/);
    const command = parts[0];

    if (command === "fill" && parts.length >= 8) {
      fillCount += 1;
      const coords = parts.slice(1, 7).map(parseRelativeCoord);
      const blockSpec = parts[7];
      const block = normalizeBlockName(blockSpec);
      const state = parseBlockState(blockSpec);
      const [x1, y1, z1, x2, y2, z2] = coords;
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      const minZ = Math.min(z1, z2);
      const maxZ = Math.max(z1, z2);
      const mode = parts[8] || "";
      if (!block || block === "air") {
        removeBoxFromCuboids(cuboids, minX, minY, minZ, maxX, maxY, maxZ);
        skippedAir += 1;
        continue;
      }
      if (mode === "hollow") {
        removeBoxFromCuboids(cuboids, minX, minY, minZ, maxX, maxY, maxZ);
        addHollowCuboids(cuboids, minX, minY, minZ, maxX, maxY, maxZ, block);
      } else if (mode === "outline") {
        const outlineCuboids = [];
        addOutlineCuboids(outlineCuboids, minX, minY, minZ, maxX, maxY, maxZ, block);
        for (const item of outlineCuboids) {
          addReplacingCuboid(cuboids, item.minX, item.minY, item.minZ, item.maxX, item.maxY, item.maxZ, item.block);
        }
      } else {
        addReplacingCuboid(cuboids, minX, minY, minZ, maxX, maxY, maxZ, block, state);
      }
      continue;
    }

    if (command === "setblock" && parts.length >= 5) {
      setblockCount += 1;
      const [x, y, z] = parts.slice(1, 4).map(parseRelativeCoord);
      const blockSpec = parts[4];
      const block = normalizeBlockName(blockSpec);
      const state = parseBlockState(blockSpec);
      if (!block || block === "air") {
        removeBoxFromCuboids(cuboids, x, y, z, x, y, z);
        skippedAir += 1;
        continue;
      }
      addReplacingCuboid(cuboids, x, y, z, x, y, z, block, state);
    }
  }

  let visibleVolume = 0;
  for (const item of cuboids) {
    const volume = cuboidVolume(item);
    blockCounts.set(item.block, (blockCounts.get(item.block) || 0) + volume);
    visibleVolume += volume;
    bounds.minX = Math.min(bounds.minX, item.minX);
    bounds.minY = Math.min(bounds.minY, item.minY);
    bounds.minZ = Math.min(bounds.minZ, item.minZ);
    bounds.maxX = Math.max(bounds.maxX, item.maxX);
    bounds.maxY = Math.max(bounds.maxY, item.maxY);
    bounds.maxZ = Math.max(bounds.maxZ, item.maxZ);
  }

  return {
    cuboids,
    blockCounts,
    fillCount,
    setblockCount,
    skippedAir,
    visibleVolume,
    bounds,
  };
}

function colorForBlock(block) {
  const style = blockStyles[block];
  if (style) return style.color;
  let hash = 0;
  for (const char of block) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return `hsl(${hash} 58% 55%)`;
}

function blockLayer(block) {
  if (["stone", "cobblestone", "stone_bricks", "deepslate", "blackstone"].includes(block)) return "terrain";
  if (["gray_concrete", "smooth_stone", "cyan_concrete", "white_concrete", "diamond_block", "rail", "yellow_concrete"].includes(block)) return "route";
  if (block.includes("glass")) return "glass";
  if (["sea_lantern", "redstone_lamp", "lantern", "soul_lantern", "glowstone", "chain", "iron_chain"].includes(block)) return "light";
  return "building";
}

function cuboidVolume(item) {
  return (item.maxX - item.minX + 1) * (item.maxY - item.minY + 1) * (item.maxZ - item.minZ + 1);
}

function cuboidIntersectsBox(item, box) {
  return !(
    item.maxX < box.minX ||
    item.minX > box.maxX ||
    item.maxY < box.minY ||
    item.minY > box.maxY ||
    item.maxZ < box.minZ ||
    item.minZ > box.maxZ
  );
}

function componentStats(model, definition) {
  const counts = new Map();
  let volume = 0;
  for (const cuboid of model.cuboids) {
    if (!cuboidIntersectsBox(cuboid, definition.box)) continue;
    const itemVolume = cuboidVolume(cuboid);
    volume += itemVolume;
    counts.set(cuboid.block, (counts.get(cuboid.block) || 0) + itemVolume);
  }
  return {
    volume,
    materials: [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([block]) => block),
  };
}

function renderLayerActions(model) {
  if (!layerActions) return;
  const layerVolumes = new Map(layerFilters.map((item) => [item.id, 0]));
  for (const cuboid of model?.cuboids || []) {
    const layer = blockLayer(cuboid.block);
    const volume = cuboidVolume(cuboid);
    layerVolumes.set(layer, (layerVolumes.get(layer) || 0) + volume);
    layerVolumes.set("all", (layerVolumes.get("all") || 0) + volume);
  }
  layerActions.innerHTML = layerFilters
    .map((item) => {
      const active = previewState.currentLayer === item.id ? " active" : "";
      const volume = layerVolumes.get(item.id) || 0;
      return `<button class="layer-chip${active}" type="button" data-layer-filter="${item.id}">${item.label}<span>${volume.toLocaleString("zh-CN")}</span></button>`;
    })
    .join("");
}

function renderMaterialBoard(model) {
  if (!materialBoard) return;
  materialBoard.innerHTML = materialFamilies
    .map((family) => {
      const blocks = family.blocks
        .map((block) => {
          const count = model?.blockCounts.get(block) || 0;
          const inactive = count ? "" : " inactive";
          return `<span class="material-token${inactive}" style="--block-color:${colorForBlock(block)}"><code>${block}</code><strong>${count.toLocaleString("zh-CN")}</strong></span>`;
        })
        .join("");
      return `<article class="material-family"><h4>${family.title}</h4><div>${blocks}</div></article>`;
    })
    .join("");
}

function renderComponentLibrary(model) {
  if (!componentLibrary) return;
  componentLibrary.innerHTML = componentDefinitions
    .map((definition) => {
      const stats = model ? componentStats(model, definition) : { volume: 0, materials: [] };
      const active = previewState.focusedComponent === definition.id ? " active" : "";
      const materials = stats.materials
        .map((block) => `<i style="--block-color:${colorForBlock(block)}" title="${block}"></i>`)
        .join("");
      return `
        <button class="component-card${active}" type="button" data-component="${definition.id}">
          <strong>${definition.label}</strong>
          <span>${definition.footprint} / 高 ${definition.height}</span>
          <small>${stats.volume.toLocaleString("zh-CN")} blocks</small>
          <em>${materials}</em>
        </button>
      `;
    })
    .join("");
}

function commandModeContains(mode, x, y, z, minX, minY, minZ, maxX, maxY, maxZ) {
  if (mode === "hollow") {
    return x === minX || x === maxX || y === minY || y === maxY || z === minZ || z === maxZ;
  }
  if (mode === "outline") {
    const edgeCount = Number(x === minX || x === maxX) + Number(y === minY || y === maxY) + Number(z === minZ || z === maxZ);
    return edgeCount >= 2;
  }
  return true;
}

function isHeavyStructureBlock(block) {
  return [
    "stone",
    "cobblestone",
    "stone_bricks",
    "smooth_stone",
    "smooth_quartz",
    "quartz_block",
    "white_concrete",
    "light_gray_concrete",
    "gray_concrete",
    "black_concrete",
    "cyan_concrete",
    "blue_concrete",
    "lime_concrete",
  ].includes(block);
}

function canVisiblySupportBlock(block) {
  return Boolean(block) && ![
    "air",
    "chain",
    "iron_chain",
    "lantern",
    "soul_lantern",
    "cherry_leaves",
    "oak_leaves",
    "white_carpet",
    "blue_carpet",
    "lime_carpet",
    "rail",
    "stone_pressure_plate",
    "flower_pot",
    "bed",
    "water",
    "lava",
  ].includes(block);
}

function auditBedrockStructure(commandText) {
  const zones = [
    { id: "entryRoad", label: "37 格宽入口车道", box: { minX: -18, minY: 0, minZ: -226, maxX: 18, maxY: 1, maxZ: -48 } },
    { id: "gatePodium", label: "SpaceX 大门全方块台基", box: { minX: -196, minY: -1, minZ: -224, maxX: 196, maxY: 1, maxZ: -116 } },
    { id: "rearRoad", label: "后区规整车道", box: { minX: -14, minY: 0, minZ: 28, maxX: 14, maxY: 1, maxZ: 172 } },
    { id: "leftBranch", label: "左侧 HQ 车道", box: { minX: -82, minY: 0, minZ: -42, maxX: -42, maxY: 1, maxZ: -22 } },
    { id: "rightBranch", label: "右侧 HQ 车道", box: { minX: 42, minY: 0, minZ: -42, maxX: 82, maxY: 1, maxZ: -22 } },
    { id: "northRingRoad", label: "北侧 29 格闭合环路", box: { minX: -184, minY: 0, minZ: -124, maxX: 184, maxY: 1, maxZ: -96 } },
    { id: "southRingRoad", label: "南侧 29 格闭合环路", box: { minX: -184, minY: 0, minZ: 158, maxX: 184, maxY: 1, maxZ: 186 } },
    { id: "westRingRoad", label: "西侧 29 格闭合环路", box: { minX: -198, minY: 0, minZ: -110, maxX: -170, maxY: 1, maxZ: 172 } },
    { id: "eastRingRoad", label: "东侧 29 格闭合环路", box: { minX: 170, minY: 0, minZ: -110, maxX: 198, maxY: 1, maxZ: 172 } },
    { id: "greenHqRingConnector", label: "绿色 HQ 接入环路", box: { minX: -184, minY: 0, minZ: -18, maxX: -78, maxY: 1, maxZ: 2 } },
    { id: "blueHqRingConnector", label: "蓝色 HQ 接入环路", box: { minX: 78, minY: 0, minZ: -18, maxX: 184, maxY: 1, maxZ: 2 } },
    { id: "laserRingConnector", label: "激光迷宫接入环路", box: { minX: 44, minY: 0, minZ: -110, maxX: 60, maxY: 1, maxZ: -86 } },
    { id: "roverRingConnector", label: "车道接入环路", box: { minX: -73, minY: 0, minZ: -110, maxX: -57, maxY: 1, maxZ: -86 } },
    { id: "centralSouthRingConnector", label: "中央主轴接入南环", box: { minX: -14, minY: 0, minZ: 112, maxX: 14, maxY: 1, maxZ: 172 } },
    { id: "crystalRingConnector", label: "水晶洞接入环路", box: { minX: -98, minY: 0, minZ: 98, maxX: -78, maxY: 1, maxZ: 172 } },
    { id: "finalLaunchRingConnector", label: "最终发射区接入环路", box: { minX: -58, minY: 0, minZ: 126, maxX: -38, maxY: 1, maxZ: 172 } },
    { id: "rocketPlaza", label: "火箭广场底层承托", box: { minX: -46, minY: 0, minZ: -52, maxX: 46, maxY: 0, maxZ: 32 } },
    { id: "rocketPad", label: "火箭发射台地基", box: { minX: -54, minY: 0, minZ: -60, maxX: 54, maxY: 0, maxZ: 38 } },
    { id: "lowerArmFrontContact", label: "下前服务臂贴合箭体", box: { minX: -7, minY: 52, minZ: -19, maxX: -4, maxY: 55, maxZ: -17 } },
    { id: "lowerArmBackContact", label: "下后服务臂贴合箭体", box: { minX: -7, minY: 52, minZ: -7, maxX: -4, maxY: 55, maxZ: -5 } },
    { id: "upperArmFrontContact", label: "上前服务臂贴合箭体", box: { minX: -7, minY: 86, minZ: -19, maxX: -4, maxY: 89, maxZ: -17 } },
    { id: "upperArmBackContact", label: "上后服务臂贴合箭体", box: { minX: -7, minY: 86, minZ: -7, maxX: -4, maxY: 89, maxZ: -5 } },
  ].map((zone) => ({ ...zone, blocks: new Map() }));
  const supportZones = [
    { id: "leftSpaceXWall", label: "左侧黑墙承重", box: { minX: -188, minY: 2, minZ: -190, maxX: -148, maxY: 34, maxZ: -132 } },
    { id: "rightSpaceXWall", label: "右侧黑墙承重", box: { minX: 148, minY: 2, minZ: -190, maxX: 188, maxY: 34, maxZ: -132 } },
    { id: "spaceXLetterRail", label: "SPACE X 字母支撑轨", box: { minX: -140, minY: 20, minZ: -184, maxX: 142, maxY: 31, maxZ: -179 } },
    { id: "rocketStack", label: "高火箭核心箭体承重", box: { minX: -5, minY: 5, minZ: -16, maxX: 5, maxY: 127, maxZ: -8 } },
  ].map((zone) => ({ ...zone, blocks: new Map() }));
  const allZones = [...zones, ...supportZones];

  function key(x, y, z) {
    return `${x},${y},${z}`;
  }

  function applyFill(zone, minX, minY, minZ, maxX, maxY, maxZ, block, mode) {
    const box = zone.box;
    const ix1 = Math.max(box.minX, minX);
    const iy1 = Math.max(box.minY, minY);
    const iz1 = Math.max(box.minZ, minZ);
    const ix2 = Math.min(box.maxX, maxX);
    const iy2 = Math.min(box.maxY, maxY);
    const iz2 = Math.min(box.maxZ, maxZ);
    if (ix1 > ix2 || iy1 > iy2 || iz1 > iz2) return;
    for (let x = ix1; x <= ix2; x += 1) {
      for (let y = iy1; y <= iy2; y += 1) {
        for (let z = iz1; z <= iz2; z += 1) {
          if (!commandModeContains(mode, x, y, z, minX, minY, minZ, maxX, maxY, maxZ)) continue;
          zone.blocks.set(key(x, y, z), block);
        }
      }
    }
  }

  for (const rawLine of String(commandText || "").split("\n")) {
    const line = rawLine.trim().replace(/^\//, "");
    if (!line || line.startsWith("#")) continue;
    const parts = line.split(/\s+/);
    if (parts[0] === "fill" && parts.length >= 8) {
      const [x1, y1, z1, x2, y2, z2] = parts.slice(1, 7).map(parseRelativeCoord);
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      const minZ = Math.min(z1, z2);
      const maxZ = Math.max(z1, z2);
      const block = normalizeBlockName(parts[7]);
      const mode = parts[8] || "";
      for (const zone of allZones) applyFill(zone, minX, minY, minZ, maxX, maxY, maxZ, block, mode);
    }
    if (parts[0] === "setblock" && parts.length >= 5) {
      const [x, y, z] = parts.slice(1, 4).map(parseRelativeCoord);
      const block = normalizeBlockName(parts[4]);
      for (const zone of allZones) {
        const box = zone.box;
        if (x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY && z >= box.minZ && z <= box.maxZ) {
          zone.blocks.set(key(x, y, z), block);
        }
      }
    }
  }

  const baseAudit = zones.map((zone) => {
    const box = zone.box;
    const total = (box.maxX - box.minX + 1) * (box.maxY - box.minY + 1) * (box.maxZ - box.minZ + 1);
    let solid = 0;
    const counts = new Map();
    for (let x = box.minX; x <= box.maxX; x += 1) {
      for (let y = box.minY; y <= box.maxY; y += 1) {
        for (let z = box.minZ; z <= box.maxZ; z += 1) {
          const block = zone.blocks.get(key(x, y, z));
          if (!block || block === "air") continue;
          solid += 1;
          counts.set(block, (counts.get(block) || 0) + 1);
        }
      }
    }
    const missing = total - solid;
    return {
      id: zone.id,
      label: zone.label,
      total,
      solid,
      missing,
      tone: missing === 0 ? "ok" : missing / total < 0.02 ? "warn" : "bad",
      topBlocks: [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([block]) => block),
    };
  });

  const supportAudit = supportZones.map((zone) => {
    const box = zone.box;
    let checked = 0;
    let unsupported = 0;
    const examples = [];
    const counts = new Map();
    for (let x = box.minX; x <= box.maxX; x += 1) {
      for (let y = box.minY + 1; y <= box.maxY; y += 1) {
        for (let z = box.minZ; z <= box.maxZ; z += 1) {
          const block = zone.blocks.get(key(x, y, z));
          if (!isHeavyStructureBlock(block)) continue;
          checked += 1;
          counts.set(block, (counts.get(block) || 0) + 1);
          const below = zone.blocks.get(key(x, y - 1, z));
          if (canVisiblySupportBlock(below)) continue;
          unsupported += 1;
          if (examples.length < 3) examples.push(`${x},${y},${z}`);
        }
      }
    }
    return {
      id: zone.id,
      label: zone.label,
      total: checked,
      solid: checked - unsupported,
      missing: unsupported,
      tone: unsupported === 0 ? "ok" : unsupported <= 12 ? "warn" : "bad",
      topBlocks: [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([block]) => block),
      kind: "support",
      examples,
    };
  });

  return [...baseAudit, ...supportAudit];
}

function renderStructureAudit(audit) {
  if (!structureAudit) return;
  structureAudit.innerHTML = audit
    .map((item) => {
      const result =
        item.kind === "support"
          ? item.missing === 0
            ? "无悬空"
            : `${item.missing.toLocaleString("zh-CN")} 悬空`
          : item.missing === 0
            ? "实心"
            : `${item.missing.toLocaleString("zh-CN")} 空点`;
      const sample = item.examples?.length ? `<b>${item.examples.join(" / ")}</b>` : "";
      const blocks = item.topBlocks.map((block) => `<i style="--block-color:${colorForBlock(block)}" title="${block}"></i>`).join("");
      return `
        <article class="audit-row" data-tone="${item.tone}">
          <span>${item.label}</span>
          <strong>${result}</strong>
          <small>${item.solid.toLocaleString("zh-CN")} / ${item.total.toLocaleString("zh-CN")}</small>
          ${sample}
          <em>${blocks}</em>
        </article>
      `;
    })
    .join("");
}

function parseBlueprintBoxes(commandText) {
  const boxes = [];
  const pattern =
    /^#\s*Blueprint box\s+([^/]+)\/([^:]+):\s*(-?\d+),(-?\d+),(-?\d+)\s*->\s*(-?\d+),(-?\d+),(-?\d+)\s+([a-z0-9_]+)(?:\s+([a-z]+))?/i;
  for (const rawLine of String(commandText || "").split("\n")) {
    const match = rawLine.trim().match(pattern);
    if (!match) continue;
    const [, layer, id, x1, y1, z1, x2, y2, z2, block, mode = ""] = match;
    const minX = Math.min(Number(x1), Number(x2));
    const maxX = Math.max(Number(x1), Number(x2));
    const minY = Math.min(Number(y1), Number(y2));
    const maxY = Math.max(Number(y1), Number(y2));
    const minZ = Math.min(Number(z1), Number(z2));
    const maxZ = Math.max(Number(z1), Number(z2));
    boxes.push({
      layer,
      id,
      block,
      mode,
      minX,
      maxX,
      minY,
      maxY,
      minZ,
      maxZ,
      volume: (maxX - minX + 1) * (maxY - minY + 1) * (maxZ - minZ + 1),
    });
  }
  return boxes;
}

function renderBlueprintAudit(commandText) {
  if (!blueprintAudit) return;
  const boxes = parseBlueprintBoxes(commandText);
  if (!boxes.length) {
    blueprintAudit.innerHTML = `<article class="audit-row" data-tone="warn"><span>未找到蓝图 box</span><strong>缺图纸</strong><small>0 / 0</small></article>`;
    return;
  }
  const layerOrder = ["clear", "foundation", "route", "structure", "decoration"];
  blueprintAudit.innerHTML = layerOrder
    .flatMap((layer) =>
      boxes
        .filter((box) => box.layer === layer)
        .map((box) => {
          const size = `${box.maxX - box.minX + 1}x${box.maxY - box.minY + 1}x${box.maxZ - box.minZ + 1}`;
          const range = `x ${box.minX}..${box.maxX} / y ${box.minY}..${box.maxY} / z ${box.minZ}..${box.maxZ}`;
          const blockSwatch = `<i style="--block-color:${colorForBlock(box.block)}" title="${box.block}"></i>`;
          return `
            <article class="audit-row blueprint-row" data-tone="ok" data-layer="${box.layer}">
              <span>${box.id}</span>
              <strong>${box.layer}</strong>
              <small>${range}</small>
              <b>${size} / ${box.volume.toLocaleString("zh-CN")} 格</b>
              <em>${blockSwatch}<code>${box.block}${box.mode ? ` ${box.mode}` : ""}</code></em>
            </article>
          `;
        }),
    )
    .join("");
}

function renderCameraActions() {
  document.querySelectorAll("[data-camera]").forEach((button) => {
    const active = button.dataset.camera === previewState.currentPreset;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function renderEditorWorkbench(model, commandText) {
  renderLayerActions(model);
  renderMaterialBoard(model);
  renderComponentLibrary(model);
  renderStructureAudit(auditBedrockStructure(commandText));
  renderBlueprintAudit(commandText);
  renderCameraActions();
}

function shadeColor(hex, amount) {
  const value = hex.replace("#", "");
  const number = Number.parseInt(value.length === 3 ? value.split("").map((char) => char + char).join("") : value, 16);
  const r = Math.max(0, Math.min(255, (number >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((number >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (number & 255) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function makeBlockTexture(three, block, style) {
  if (!style.pattern || typeof document === "undefined") return null;
  const key = `${block}:${style.pattern}:${style.color}`;
  const cached = previewState.textureCache?.get(key);
  if (cached) return cached;

  previewState.textureCache ||= new Map();
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = style.color;
  ctx.fillRect(0, 0, 32, 32);

  if (style.pattern === "cobblestone") {
    const stones = [
      [0, 0, 10, 8, -22],
      [10, 0, 12, 9, 8],
      [22, 0, 10, 8, -12],
      [0, 8, 8, 12, 14],
      [8, 9, 14, 10, -8],
      [22, 8, 10, 13, 18],
      [0, 20, 12, 12, -14],
      [12, 19, 10, 13, 12],
      [22, 21, 10, 11, -20],
    ];
    for (const [x, y, w, h, shade] of stones) {
      ctx.fillStyle = shadeColor(style.color, shade);
      ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
    }
    ctx.strokeStyle = shadeColor(style.color, -42);
    ctx.lineWidth = 1;
    for (const [x, y, w, h] of stones) ctx.strokeRect(x + 0.5, y + 0.5, w, h);
  } else if (style.pattern === "bricks") {
    ctx.fillStyle = shadeColor(style.color, -34);
    for (let y = 7; y < 32; y += 8) ctx.fillRect(0, y, 32, 1);
    for (let row = 0; row < 4; row += 1) {
      const offset = row % 2 === 0 ? 0 : 8;
      for (let x = offset; x < 32; x += 16) ctx.fillRect(x, row * 8, 1, 8);
    }
    ctx.fillStyle = shadeColor(style.color, 16);
    ctx.fillRect(2, 2, 7, 2);
    ctx.fillRect(18, 11, 8, 2);
    ctx.fillRect(7, 21, 8, 2);
  } else if (style.pattern === "stone") {
    for (let y = 0; y < 32; y += 4) {
      for (let x = 0; x < 32; x += 4) {
        const shade = ((x * 7 + y * 11) % 5) * 7 - 14;
        ctx.fillStyle = shadeColor(style.color, shade);
        ctx.fillRect(x, y, 4, 4);
      }
    }
  } else if (style.pattern === "smooth_stone") {
    ctx.strokeStyle = shadeColor(style.color, -18);
    ctx.strokeRect(0.5, 0.5, 31, 31);
    ctx.fillStyle = shadeColor(style.color, 10);
    ctx.fillRect(3, 3, 26, 3);
  } else if (style.pattern === "concrete") {
    for (let y = 0; y < 32; y += 2) {
      for (let x = 0; x < 32; x += 2) {
        const shade = ((x * 5 + y * 3) % 3) * 5 - 5;
        ctx.fillStyle = shadeColor(style.color, shade);
        ctx.fillRect(x, y, 2, 2);
      }
    }
  } else if (style.pattern === "quartz") {
    ctx.fillStyle = shadeColor(style.color, -18);
    ctx.fillRect(0, 15, 32, 1);
    ctx.fillRect(15, 0, 1, 32);
  }

  const texture = new three.CanvasTexture(canvas);
  texture.magFilter = three.NearestFilter;
  texture.minFilter = three.NearestMipmapNearestFilter;
  texture.wrapS = three.RepeatWrapping;
  texture.wrapT = three.RepeatWrapping;
  texture.repeat.set(style.pattern === "concrete" ? 2 : 3, style.pattern === "concrete" ? 2 : 3);
  if ("SRGBColorSpace" in three) texture.colorSpace = three.SRGBColorSpace;
  previewState.textureCache.set(key, texture);
  return texture;
}

async function ensureThreePreview() {
  if (previewState.three && previewState.OrbitControls) return true;
  try {
    const threeModule = await import("three");
    const controlsModule = await import("three/addons/controls/OrbitControls.js");
    previewState.three = threeModule;
    previewState.OrbitControls = controlsModule.OrbitControls;
    return true;
  } catch (error) {
    setVoxelStatus(`3D 模块加载失败：${error instanceof Error ? error.message : "unknown error"}`, "warn");
    return false;
  }
}

function resizeVoxelRenderer() {
  const { renderer, camera } = previewState;
  if (!renderer || !camera || !voxelStage) return;
  const width = Math.max(320, voxelStage.clientWidth);
  const height = Math.max(320, voxelStage.clientHeight);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function applyCameraPreset(name) {
  const componentId = String(name || "").startsWith("component:") ? String(name).replace("component:", "") : "";
  const componentPreset = componentDefinitions.find((item) => item.id === componentId)?.camera;
  const preset = componentPreset || cameraPresets[name] || cameraPresets.poster;
  const { camera, controls, three } = previewState;
  if (!camera || !controls || !three) return;
  camera.position.set(...preset.position);
  controls.target.set(...preset.target);
  controls.update();
  previewState.currentPreset = name;
  renderCameraActions();
}

function startVoxelAnimation() {
  if (previewState.animationFrame) return;
  const tick = () => {
    const { renderer, scene, camera, controls } = previewState;
    if (renderer && scene && camera) {
      controls?.update();
      renderer.render(scene, camera);
    }
    previewState.animationFrame = requestAnimationFrame(tick);
  };
  previewState.animationFrame = requestAnimationFrame(tick);
}

function visibleCuboidsForCurrentLayer(model) {
  if (!model || previewState.currentLayer === "all") return model?.cuboids || [];
  return model.cuboids.filter((cuboid) => blockLayer(cuboid.block) === previewState.currentLayer);
}

function assetTextureUrl(texturePath) {
  return `/minecraft-assets/${texturePath}.png`;
}

function loadAssetTexture(three, texturePath) {
  if (!texturePath) return null;
  previewState.textureCache ||= new Map();
  const key = `asset:${texturePath}`;
  const cached = previewState.textureCache.get(key);
  if (cached) return cached;

  previewState.assetTextureLoader ||= new three.TextureLoader();
  const texture = previewState.assetTextureLoader.load(assetTextureUrl(texturePath), (loaded) => {
    loaded.magFilter = three.NearestFilter;
    loaded.minFilter = three.NearestMipmapNearestFilter;
    loaded.wrapS = three.RepeatWrapping;
    loaded.wrapT = three.RepeatWrapping;
    loaded.needsUpdate = true;
  });
  texture.magFilter = three.NearestFilter;
  texture.minFilter = three.NearestMipmapNearestFilter;
  texture.wrapS = three.RepeatWrapping;
  texture.wrapT = three.RepeatWrapping;
  if ("SRGBColorSpace" in three) texture.colorSpace = three.SRGBColorSpace;
  previewState.textureCache.set(key, texture);
  return texture;
}

function materialForAssetPath(three, block, texturePath, options = {}) {
  const style = blockStyles[block] || { color: colorForBlock(block) };
  const hints = textureRenderHints(block);
  const map = loadAssetTexture(three, texturePath);
  return new three.MeshStandardMaterial({
    color: "#ffffff",
    map,
    emissive: style.emissive || "#000000",
    emissiveIntensity: style.emissive ? 0.35 : 0,
    metalness: style.metalness || 0,
    roughness: options.roughness ?? 0.86,
    transparent: options.transparent ?? hints.transparent,
    opacity: options.opacity ?? (typeof style.opacity === "number" ? style.opacity : 1),
    alphaTest: options.alphaTest ?? hints.alphaTest,
    side: options.doubleSided || hints.doubleSided ? three.DoubleSide : three.FrontSide,
  });
}

function assetMaterialsForBlock(three, block) {
  const facePaths = assetTexturePathsForBlock(block);
  if (!facePaths) return null;
  return boxMaterialFaces.map((face) => {
    const texturePath = facePaths[face] || facePaths.side || facePaths.up || facePaths.down || Object.values(facePaths)[0];
    return materialForAssetPath(three, block, texturePath);
  });
}

function materialForBlock(three, block) {
  const assetMaterials = assetMaterialsForBlock(three, block);
  if (assetMaterials) return assetMaterials;
  const style = blockStyles[block] || { color: colorForBlock(block) };
  const map = makeBlockTexture(three, block, style);
  return new three.MeshStandardMaterial({
    color: map ? "#ffffff" : style.color,
    map,
    emissive: style.emissive || "#000000",
    emissiveIntensity: style.emissive ? 0.35 : 0,
    metalness: style.metalness || 0,
    roughness: style.pattern === "concrete" ? 0.82 : 0.9,
    transparent: typeof style.opacity === "number" && style.opacity < 1,
    opacity: typeof style.opacity === "number" ? style.opacity : 1,
  });
}

function addBoxPart(three, group, material, x, y, z, sx, sy, sz) {
  const geometry = new three.BoxGeometry(sx, sy, sz);
  const mesh = new three.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addOrientedBoxPart(three, group, material, centerX, centerY, centerZ, direction, along, across, width, height, length) {
  const dir = bedDirectionVector(direction);
  const cross = { dx: -dir.dz, dz: dir.dx };
  const x = centerX + dir.dx * along + cross.dx * across;
  const z = centerZ + dir.dz * along + cross.dz * across;
  const lengthOnX = Math.abs(dir.dx) > 0;
  return addBoxPart(three, group, material, x, centerY, z, lengthOnX ? length : width, height, lengthOnX ? width : length);
}

function addPlanePart(three, group, material, x, y, z, width, height, rotationY = 0) {
  const geometry = new three.PlaneGeometry(width, height);
  const mesh = new three.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotationY;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addChainPreviewModel(three, scene, cuboids) {
  const chainFaces = assetTexturePathsForBlock("chain");
  const sidePath = chainFaces?.north || chainFaces?.south || chainFaces?.east || chainFaces?.west;
  const sideMaterial = sidePath
    ? materialForAssetPath(three, "chain", sidePath, { transparent: true, alphaTest: 0.12, doubleSided: true, roughness: 0.82 })
    : new three.MeshStandardMaterial({ color: "#343946", metalness: 0.65, roughness: 0.45 });
  const fallbackGeometry = sidePath ? null : new three.TorusGeometry(0.24, 0.045, 6, 14);
  const group = new three.Group();
  group.name = "chain:preview_model";

  for (const item of cuboids) {
    for (let x = item.minX; x <= item.maxX; x += 1) {
      for (let y = item.minY; y <= item.maxY; y += 1) {
        for (let z = item.minZ; z <= item.maxZ; z += 1) {
          if (sidePath) {
            addPlanePart(three, group, sideMaterial, x, y, z, 0.72, 0.98, 0);
            addPlanePart(three, group, sideMaterial, x, y, z, 0.72, 0.98, Math.PI / 2);
          } else {
            const link = new three.Mesh(fallbackGeometry, sideMaterial);
            link.position.set(x, y, z);
            if ((y + x + z) % 2 === 0) {
              link.rotation.set(Math.PI / 2, 0, 0);
            } else {
              link.rotation.set(0, Math.PI / 2, 0);
            }
            link.scale.set(0.8, 1.25, 0.8);
            link.castShadow = true;
            group.add(link);
          }
        }
      }
    }
  }

  scene.add(group);
}

function addLanternPreviewModel(three, scene, cuboids) {
  const lanternFaces = assetTexturePathsForBlock("lantern");
  const lanternPath = lanternFaces?.north || lanternFaces?.south || lanternFaces?.up || Object.values(lanternFaces || {})[0];
  const spriteMaterial = lanternPath
    ? materialForAssetPath(three, "lantern", lanternPath, { transparent: true, alphaTest: 0.08, doubleSided: true, roughness: 0.58 })
    : null;
  const metal = new three.MeshStandardMaterial({ color: "#2f3542", metalness: 0.5, roughness: 0.48 });
  const glass = new three.MeshStandardMaterial({
    color: "#ffd36a",
    emissive: "#f59e0b",
    emissiveIntensity: 0.9,
    roughness: 0.36,
    transparent: true,
    opacity: 0.88,
  });
  const group = new three.Group();
  group.name = "lantern:preview_model";

  for (const item of cuboids) {
    for (let x = item.minX; x <= item.maxX; x += 1) {
      for (let y = item.minY; y <= item.maxY; y += 1) {
        for (let z = item.minZ; z <= item.maxZ; z += 1) {
          if (spriteMaterial) {
            addPlanePart(three, group, spriteMaterial, x, y, z, 0.92, 0.92, 0);
            addPlanePart(three, group, spriteMaterial, x, y, z, 0.92, 0.92, Math.PI / 2);
            addBoxPart(three, group, metal, x, y + 0.48, z, 0.2, 0.22, 0.2);
            addBoxPart(three, group, glass, x, y - 0.02, z, 0.34, 0.34, 0.34);
          } else {
            addBoxPart(three, group, glass, x, y, z, 0.46, 0.58, 0.46);
            addBoxPart(three, group, metal, x, y + 0.36, z, 0.58, 0.12, 0.58);
            addBoxPart(three, group, metal, x, y - 0.36, z, 0.56, 0.12, 0.56);
            addBoxPart(three, group, metal, x - 0.32, y, z, 0.08, 0.62, 0.08);
            addBoxPart(three, group, metal, x + 0.32, y, z, 0.08, 0.62, 0.08);
            addBoxPart(three, group, metal, x, y, z - 0.32, 0.08, 0.62, 0.08);
            addBoxPart(three, group, metal, x, y, z + 0.32, 0.08, 0.62, 0.08);
            addBoxPart(three, group, metal, x, y + 0.58, z, 0.18, 0.28, 0.18);
          }
          const light = new three.PointLight("#fbbf24", 0.35, 18, 2.2);
          light.position.set(x, y, z);
          group.add(light);
        }
      }
    }
  }

  scene.add(group);
}

function bedDirectionVector(direction) {
  const directionMap = {
    0: { dx: 0, dz: 1 },
    1: { dx: -1, dz: 0 },
    2: { dx: 0, dz: -1 },
    3: { dx: 1, dz: 0 },
  };
  return directionMap[direction] || directionMap[2];
}

function bedKey(x, y, z) {
  return `${x},${y},${z}`;
}

function addBedPreviewModel(three, scene, cuboids) {
  const group = new three.Group();
  group.name = "bed:preview_model";
  const bedTexturePath = previewState.assetPack ? "textures/entity/bed/red" : "";
  const blanket = bedTexturePath
    ? materialForAssetPath(three, "bed", bedTexturePath, { roughness: 0.82 })
    : new three.MeshStandardMaterial({ color: "#b91c1c", roughness: 0.82 });
  const pillow = new three.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.88 });
  const frame = new three.MeshStandardMaterial({ color: "#6b3f24", roughness: 0.78 });
  const footBlocks = [];
  const cells = new Map();

  for (const item of cuboids) {
    for (let x = item.minX; x <= item.maxX; x += 1) {
      for (let y = item.minY; y <= item.maxY; y += 1) {
        for (let z = item.minZ; z <= item.maxZ; z += 1) {
          const cell = { x, y, z, state: item.state || {} };
          cells.set(bedKey(x, y, z), cell);
          if (cell.state.head_piece_bit === false) footBlocks.push(cell);
        }
      }
    }
  }

  const rendered = new Set();
  const renderBed = (foot) => {
    const direction = typeof foot.state.direction === "number" ? foot.state.direction : 2;
    const dir = bedDirectionVector(direction);
    const head = cells.get(bedKey(foot.x + dir.dx, foot.y, foot.z + dir.dz));
    const centerX = head ? (foot.x + head.x) / 2 : foot.x + dir.dx * 0.5;
    const centerZ = head ? (foot.z + head.z) / 2 : foot.z + dir.dz * 0.5;
    const centerY = foot.y;

    addOrientedBoxPart(three, group, frame, centerX, centerY - 0.43, centerZ, direction, 0, 0, 0.9, 0.14, 1.86);
    addOrientedBoxPart(three, group, blanket, centerX, centerY - 0.18, centerZ, direction, -0.26, 0, 0.88, 0.34, 1.22);
    addOrientedBoxPart(three, group, pillow, centerX, centerY - 0.01, centerZ, direction, 0.64, 0, 0.82, 0.16, 0.5);
    addOrientedBoxPart(three, group, frame, centerX, centerY - 0.2, centerZ, direction, -0.85, 0, 0.9, 0.2, 0.08);
    for (const along of [-0.72, 0.72]) {
      for (const across of [-0.34, 0.34]) {
        addOrientedBoxPart(three, group, frame, centerX, centerY - 0.53, centerZ, direction, along, across, 0.12, 0.28, 0.12);
      }
    }

    rendered.add(bedKey(foot.x, foot.y, foot.z));
    if (head) rendered.add(bedKey(head.x, head.y, head.z));
  };

  for (const foot of footBlocks) renderBed(foot);

  for (const cell of cells.values()) {
    if (rendered.has(bedKey(cell.x, cell.y, cell.z))) continue;
    addBoxPart(three, group, frame, cell.x, cell.y - 0.43, cell.z, 0.9, 0.14, 0.9);
    addBoxPart(three, group, blanket, cell.x, cell.y - 0.18, cell.z, 0.88, 0.34, 0.88);
  }

  scene.add(group);
}

function updatePreviewMeta(model, serverData) {
  const sizeX = model.bounds.maxX - model.bounds.minX + 1;
  const sizeY = model.bounds.maxY - model.bounds.minY + 1;
  const sizeZ = model.bounds.maxZ - model.bounds.minZ + 1;
  previewMetrics.innerHTML = [
    ["命令行", serverData.lineCount || model.fillCount + model.setblockCount],
    ["可见体块", model.visibleVolume.toLocaleString("zh-CN")],
    ["渲染件", model.cuboids.length.toLocaleString("zh-CN")],
    ["尺寸", `${sizeX} x ${sizeY} x ${sizeZ}`],
    ["材质", previewState.assetPack ? "Bedrock 纹理" : "模拟材质"],
  ]
    .map(([label, value]) => `<span>${label}<strong>${value}</strong></span>`)
    .join("");

  const topBlocks = [...model.blockCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16);
  blockLegend.innerHTML = topBlocks
    .map(([block, count]) => `<span style="--block-color:${colorForBlock(block)}" title="${count.toLocaleString("zh-CN")} blocks">${block}</span>`)
    .join("");
}

async function renderVoxelModel(model) {
  if (!(await ensureThreePreview())) return;
  await loadMinecraftAssetPack();
  const three = previewState.three;
  const OrbitControls = previewState.OrbitControls;

  if (!previewState.renderer) {
    previewState.renderer = new three.WebGLRenderer({ canvas: voxelCanvas, antialias: true, alpha: true });
    previewState.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    previewState.renderer.shadowMap.enabled = true;
    previewState.renderer.shadowMap.type = three.PCFSoftShadowMap;
    previewState.camera = new three.PerspectiveCamera(44, 1, 0.1, 800);
    previewState.scene = new three.Scene();
    previewState.controls = new OrbitControls(previewState.camera, voxelCanvas);
    previewState.controls.enableDamping = true;
    previewState.controls.dampingFactor = 0.08;
    previewState.controls.maxDistance = 520;
    previewState.controls.minDistance = 4;
    if ("ResizeObserver" in window) {
      previewState.resizeObserver = new ResizeObserver(resizeVoxelRenderer);
      previewState.resizeObserver.observe(voxelStage);
    } else {
      window.addEventListener("resize", resizeVoxelRenderer);
    }
    startVoxelAnimation();
  }

  const scene = previewState.scene;
  scene.clear();
  scene.background = new three.Color("#9fd4ff");
  scene.fog = new three.Fog("#b7d7ea", 300, 680);

  const hemi = new three.HemisphereLight("#f8fafc", "#64748b", 1.15);
  scene.add(hemi);
  const sun = new three.DirectionalLight("#ffffff", 1.4);
  sun.position.set(-80, 120, -120);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -180;
  sun.shadow.camera.right = 180;
  sun.shadow.camera.top = 180;
  sun.shadow.camera.bottom = -180;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 420;
  scene.add(sun);

  const grid = new three.GridHelper(260, 26, "#22d3ee", "#64748b");
  grid.position.y = -0.55;
  scene.add(grid);

  const groups = new Map();
  const visibleCuboids = visibleCuboidsForCurrentLayer(model);
  for (const cuboid of visibleCuboids) {
    const items = groups.get(cuboid.block) || [];
    items.push(cuboid);
    groups.set(cuboid.block, items);
  }

  const chainCuboids = [...(groups.get("chain") || []), ...(groups.get("iron_chain") || [])];
  const lanternCuboids = groups.get("lantern") || [];
  const bedCuboids = groups.get("bed") || [];
  groups.delete("chain");
  groups.delete("iron_chain");
  groups.delete("lantern");
  groups.delete("bed");

  const geometry = new three.BoxGeometry(1, 1, 1);
  const matrix = new three.Matrix4();
  const position = new three.Vector3();
  const quaternion = new three.Quaternion();
  const scale = new three.Vector3();

  for (const [block, cuboids] of groups.entries()) {
    const mesh = new three.InstancedMesh(geometry, materialForBlock(three, block), cuboids.length);
    mesh.name = block;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    for (let index = 0; index < cuboids.length; index += 1) {
      const item = cuboids[index];
      const sx = item.maxX - item.minX + 1;
      const sy = item.maxY - item.minY + 1;
      const sz = item.maxZ - item.minZ + 1;
      position.set((item.minX + item.maxX) / 2, (item.minY + item.maxY) / 2, (item.minZ + item.maxZ) / 2);
      scale.set(sx, sy, sz);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(index, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    scene.add(mesh);
  }

  if (chainCuboids.length) addChainPreviewModel(three, scene, chainCuboids);
  if (lanternCuboids.length) addLanternPreviewModel(three, scene, lanternCuboids);
  if (bedCuboids.length) addBedPreviewModel(three, scene, bedCuboids);

  resizeVoxelRenderer();
  applyCameraPreset(previewState.currentPreset);
}

async function refreshVoxelPreviewNow() {
  setVoxelStatus("正在读取真实 Bedrock 函数并生成 3D 预览...", "info");
  try {
    const response = await fetch("/api/preview-bedrock", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ config: currentConfig() }),
    });
    const data = await response.json();
    if (!response.ok) {
      setVoxelStatus(data.error || "预览生成失败。", "warn");
      return;
    }
    await loadMinecraftAssetPack();
    const model = parseBedrockPreviewCommands(data.commands);
    previewState.model = model;
    previewState.serverData = data;
    updatePreviewMeta(model, data);
    renderEditorWorkbench(model, data.commands);
    await renderVoxelModel(model);
    const assetText = previewState.assetPack ? "已加载 Bedrock vanilla 纹理" : `未加载官方纹理：${previewState.assetError || "请运行 npm run sync:minecraft-assets"}`;
    setVoxelStatus(`预览已按 ${data.lineCount.toLocaleString("zh-CN")} 行真实函数生成。${assetText}。`, previewState.assetPack ? "info" : "warn");
  } catch (error) {
    setVoxelStatus(`预览失败：${error instanceof Error ? error.message : "本地服务器没有响应"}`, "warn");
  }
}

function scheduleVoxelPreview() {
  window.clearTimeout(previewState.pendingTimer);
  previewState.pendingTimer = window.setTimeout(() => {
    void refreshVoxelPreviewNow();
  }, 300);
}

async function exportBedrock() {
  setExportStatus("正在生成 Bedrock .mcpack 主题乐园地图包...", "info");
  downloadBedrockPack.hidden = true;
  try {
    const response = await fetch("/api/export-bedrock", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ config: currentConfig() }),
    });
    const data = await response.json();
    if (!response.ok) {
      setExportStatus(data.error || "生成失败。", "warn");
      return;
    }
    downloadBedrockPack.href = data.downloadUrl;
    downloadBedrockPack.hidden = false;
    setExportStatus(`已生成 Bedrock Final v20 Open Stairwells 地图包：${data.mcpackPath}。下载并导入 Minecraft 后，优先运行 /function build。`, "ok");
  } catch {
    setExportStatus("生成失败：本地服务器没有响应。", "warn");
  }
}

themeGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-theme]");
  if (!button) return;
  state.themeId = button.dataset.theme;
  saveState();
  renderPlan();
  jumpTo(".section-heading.compact");
});

moduleGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-module]");
  if (!button) return;
  const id = button.dataset.module;
  if (state.moduleIds.includes(id)) {
    state.moduleIds = state.moduleIds.filter((moduleId) => moduleId !== id);
  } else {
    state.moduleIds = [...state.moduleIds, id];
  }
  saveState();
  renderPlan();
});

document.querySelectorAll("[data-size]").forEach((button) => {
  button.addEventListener("click", () => {
    state.size = button.dataset.size;
    saveState();
    document.querySelectorAll("[data-size]").forEach((item) => item.classList.toggle("active", item === button));
    renderPlan();
  });
});

taskList.addEventListener("change", (event) => {
  const input = event.target.closest("[data-progress]");
  if (!input) return;
  if (input.checked) {
    savedProgress.add(input.dataset.progress);
  } else {
    savedProgress.delete(input.dataset.progress);
  }
  persistProgress();
});

gentleMode.addEventListener("change", () => {
  state.gentleMode = gentleMode.checked;
  saveState();
  renderPlan();
});

editionSelect.addEventListener("change", () => {
  state.edition = editionSelect.value;
  saveState();
  renderPlan();
});

copyButton.addEventListener("click", async () => {
  const text = commandOutput.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "已复制";
  } catch {
    copyButton.textContent = "手动复制";
  }
  window.setTimeout(() => {
    copyButton.textContent = "复制全部";
  }, 1600);
});

speakButton.addEventListener("click", () => {
  const plan = buildPlan();
  const text = `${plan.title}。${plan.mission}。第一步，${plan.modules[0]?.kidAction || "选择一个小任务"}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});

resetButton.addEventListener("click", () => {
  savedProgress.clear();
  persistProgress();
  Object.assign(state, defaultState);
  saveState();
  renderPlan();
});

randomizeButton.addEventListener("click", () => {
  const theme = themes[Math.floor(Math.random() * themes.length)];
  const shuffled = [...modules].sort(() => Math.random() - 0.5);
  state.themeId = theme.id;
  state.moduleIds = shuffled.slice(0, 3 + Math.floor(Math.random() * 3)).map((module) => module.id);
  saveState();
  renderPlan();
  jumpTo(".result-panel");
});

jumpModules.addEventListener("click", () => jumpTo(".section-heading.compact"));
jumpResult.addEventListener("click", () => jumpTo(".result-panel"));
jumpParent.addEventListener("click", () => jumpTo(".parent-panel"));
jumpResultFromModules.addEventListener("click", () => jumpTo(".result-panel"));
exportBedrockPack.addEventListener("click", () => {
  void exportBedrock();
});

refreshPreview.addEventListener("click", () => {
  void refreshVoxelPreviewNow();
});

document.querySelector(".camera-actions").addEventListener("click", (event) => {
  const button = event.target.closest("[data-camera]");
  if (!button) return;
  previewState.focusedComponent = "";
  renderComponentLibrary(previewState.model);
  applyCameraPreset(button.dataset.camera);
});

layerActions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-layer-filter]");
  if (!button) return;
  previewState.currentLayer = button.dataset.layerFilter;
  renderLayerActions(previewState.model);
  if (previewState.model) void renderVoxelModel(previewState.model);
});

componentLibrary.addEventListener("click", (event) => {
  const button = event.target.closest("[data-component]");
  if (!button) return;
  const component = componentDefinitions.find((item) => item.id === button.dataset.component);
  if (!component) return;
  previewState.focusedComponent = component.id;
  previewState.currentLayer = component.layer;
  previewState.currentPreset = `component:${component.id}`;
  renderLayerActions(previewState.model);
  renderComponentLibrary(previewState.model);
  if (previewState.model) void renderVoxelModel(previewState.model);
  applyCameraPreset(previewState.currentPreset);
});

renderPlan();
setExportStatus("准备好了：点击“生成 Bedrock 地图包”，会输出可导入 Minecraft Bedrock 的 Final v20 Open Stairwells .mcpack。", "info");
