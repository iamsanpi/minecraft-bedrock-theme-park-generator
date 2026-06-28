import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBedrockClearFunction,
  buildBedrockRescueFunction,
  buildBedrockStartFunction,
  buildBedrockThemeParkFunction,
  buildMinecraftClearFunction,
  buildMinecraftFunction,
  buildPlan,
  getModuleIds,
  getThemeIds,
  modules,
  themes,
} from "./index.js";

function parseBedrockCoord(value: string): number {
  if (value === "~") return 0;
  if (value.startsWith("~")) return Number(value.slice(1));
  return Number(value);
}

function bedrockFillVolume(line: string): number {
  const parts = line.trim().split(/\s+/);
  if (parts[0] !== "fill" || parts.length < 8) return 0;
  const coords = parts.slice(1, 7).map(parseBedrockCoord);
  const x1 = coords[0] ?? 0;
  const y1 = coords[1] ?? 0;
  const z1 = coords[2] ?? 0;
  const x2 = coords[3] ?? 0;
  const y2 = coords[4] ?? 0;
  const z2 = coords[5] ?? 0;
  return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1) * (Math.abs(z2 - z1) + 1);
}

test("all themes and modules have kid-facing copy", () => {
  assert.ok(themes.length >= 4);
  assert.ok(modules.length >= 6);

  for (const theme of themes) {
    assert.ok(theme.kidTitle.length > 0);
    assert.ok(theme.palette.length >= 4);
    assert.ok(theme.starterBlocks.length >= 4);
  }

  for (const module of modules) {
    assert.ok(module.kidAction.length > 0);
    assert.ok(module.parentTip.length > 0);
    assert.ok(module.commands["java-worldedit"].length > 0);
    assert.ok(module.commands.bedrock.length > 0);
    assert.ok(module.commands["no-commands"].length > 0);
  }
});

test("buildPlan creates a child checklist and parent command list", () => {
  const plan = buildPlan({
    themeId: getThemeIds()[0] ?? "volcano-security",
    size: "cozy",
    edition: "java-worldedit",
    moduleIds: getModuleIds().slice(0, 4),
    gentleMode: true,
  });

  assert.match(plan.title, /火山安全岛/);
  assert.equal(plan.checklist.length, 4);
  assert.ok(plan.commands.some((command) => command.startsWith("//")));
  assert.ok(plan.mission.includes("安全版机关"));
});

test("no-command mode stays readable for offline play", () => {
  const plan = buildPlan({
    themeId: "candy-village",
    size: "tiny",
    edition: "no-commands",
    moduleIds: ["safe-house", "treasure-room"],
    gentleMode: true,
  });

  assert.equal(plan.commands.length, 2);
  assert.ok(plan.commands.every((command) => !command.startsWith("/")));
  assert.ok(plan.parentNotes.every((note) => note.includes(":")));
});

test("minecraft function exports playable map commands", () => {
  const output = buildMinecraftFunction({
    themeId: "moon-base",
    size: "tiny",
    edition: "java-worldedit",
    moduleIds: ["safe-house", "secret-tunnel", "treasure-room"],
    gentleMode: true,
  });

  assert.match(output, /Kids Map Tool: 月亮基地发射/);
  assert.match(output, /fill ~-20 ~ ~-20 ~20 ~14 ~20 air/);
  assert.match(output, /fill ~-8 ~ ~-8 ~8 ~6 ~8 white_concrete hollow/);
  assert.match(output, /setblock ~0 ~1 ~15 chest/);
  assert.match(output, /function kidsmap:clear/);
});

test("minecraft clear function removes the local build area", () => {
  const output = buildMinecraftClearFunction();

  assert.match(output, /fill ~-20 ~ ~-20 ~20 ~14 ~20 air/);
  assert.match(output, /grass_block/);
});

test("bedrock theme park function builds a large playable park", () => {
  const output = buildBedrockThemeParkFunction({
    themeId: "moon-base",
    size: "big",
    edition: "bedrock",
    moduleIds: getModuleIds(),
    gentleMode: true,
  });

  assert.match(output, /Kids Map Tool Bedrock Theme Park: 月亮基地发射/);
  assert.match(output, /# Reference v18: obstruction-free flat park build starts here/);
  assert.match(output, /# Reference v31: expanded full-block moon park structural base supports vehicle-scale roads and SpaceX-style entry gate/);
  assert.match(output, /# Reference v31: obstruction-free vehicle roads, wider lanes, curbs, double yellow lines, white edge lines, and clear driving space/);
  assert.match(output, /# Reference v31: expanded vehicle-scale ring road loops around every park district with lane markings/);
  assert.match(output, /# Blueprint: moon-park-ring-road-network/);
  assert.match(output, /# Blueprint box route\/entry-vehicle-boulevard: -18,2,-226 -> 18,2,-48 gray_concrete/);
  assert.match(output, /# Blueprint box route\/north-ring-road: -184,2,-124 -> 184,2,-96 gray_concrete/);
  assert.match(output, /# Blueprint box route\/south-ring-road: -184,2,158 -> 184,2,186 gray_concrete/);
  assert.match(output, /# Blueprint box route\/west-ring-road: -198,2,-110 -> -170,2,172 gray_concrete/);
  assert.match(output, /# Blueprint box route\/east-ring-road: 170,2,-110 -> 198,2,172 gray_concrete/);
  assert.match(output, /# Blueprint box route\/central-spine-south-ring-connector: -14,2,112 -> 14,2,172 gray_concrete/);
  assert.match(output, /# Reference v37: clean SpaceX-inspired entry gate with logo mounted on the real rear gate, no extra front logo frame, half A, curved X sweep, car-width portal, guard booths, and vehicle apron/);
  assert.match(output, /# Blueprint: spacex-entry-gate/);
  assert.match(output, /# Blueprint box clear\/expanded-entry-clearance: -188,1,-222 -> 188,62,-118 air/);
  assert.match(output, /# Blueprint box structure\/black-horizontal-gate-beam: -148,20,-184 -> 148,30,-150 black_concrete/);
  assert.doesNotMatch(output, /# Blueprint box structure\/front-clean-overhead-beam:/);
  assert.doesNotMatch(output, /# Blueprint box structure\/front-left-gate-block:/);
  assert.doesNotMatch(output, /# Blueprint box structure\/front-right-gate-block:/);
  assert.match(output, /# Blueprint box clear\/wide-vehicle-portal: -142,3,-178 -> 142,19,-150 air/);
  assert.match(output, /# Blueprint box decoration\/sliding-security-fence: -112,3,-139 -> 112,13,-139 iron_bars/);
  assert.doesNotMatch(output, /fill ~-148 ~19 ~-228 ~148 ~27 ~-224 black_concrete/);
  assert.doesNotMatch(output, /fill ~-188 ~2 ~-222 ~-148 ~27 ~-194 black_concrete/);
  assert.doesNotMatch(output, /fill ~148 ~2 ~-222 ~188 ~27 ~-194 black_concrete/);
  assert.doesNotMatch(output, /fill ~-178 ~28 ~-228 ~148 ~59 ~-226 black_concrete/);
  assert.match(output, /fill ~68 ~48 ~-184 ~86 ~51 ~-184 white_concrete/);
  assert.match(output, /fill ~21 ~38 ~-184 ~38 ~41 ~-184 white_concrete/);
  assert.match(output, /fill ~17 ~27 ~-184 ~20 ~31 ~-184 white_concrete/);
  assert.match(output, /fill ~27 ~49 ~-184 ~29 ~53 ~-184 white_concrete/);
  assert.doesNotMatch(output, /fill ~30 ~29 ~-184 ~39 ~32 ~-184 white_concrete/);
  assert.doesNotMatch(output, /fill ~36 ~28 ~-184 ~38 ~31 ~-184 white_concrete/);
  assert.doesNotMatch(output, /fill ~20 ~46 ~-184 ~21 ~49 ~-184 white_concrete/);
  assert.match(output, /fill ~-43 ~47 ~-184 ~-41 ~50 ~-184 white_concrete/);
  assert.match(output, /fill ~-54 ~38 ~-184 ~-52 ~41 ~-184 white_concrete/);
  assert.match(output, /fill ~-95 ~46 ~-184 ~-94 ~48 ~-184 white_concrete/);
  assert.doesNotMatch(output, /fill ~-82 ~66 ~-184 ~-77 ~68 ~-184 white_concrete/);
  assert.doesNotMatch(output, /white_concrete.*~-228/);
  assert.doesNotMatch(output, /fill ~132 ~31 ~-228 ~135 ~34 ~-228 white_concrete/);
  assert.doesNotMatch(output, /fill ~-132 ~31 ~-185 ~-129 ~34 ~-185 white_concrete/);
  assert.match(output, /fill ~-112 ~2 ~-139 ~112 ~12 ~-139 iron_bars/);
  assert.match(output, /fill ~-22 ~1 ~-224 ~22 ~1 ~-96 gray_concrete/);
  assert.match(output, /fill ~-2 ~1 ~-224 ~-1 ~1 ~-96 yellow_concrete/);
  assert.match(output, /fill ~1 ~1 ~-224 ~2 ~1 ~-96 yellow_concrete/);
  assert.match(output, /fill ~-18 ~1 ~-224 ~-18 ~1 ~-96 white_concrete/);
  assert.match(output, /fill ~18 ~1 ~-224 ~18 ~1 ~-96 white_concrete/);
  assert.match(output, /fill ~-184 ~1 ~-124 ~184 ~1 ~-96 gray_concrete/);
  assert.match(output, /fill ~-184 ~1 ~158 ~184 ~1 ~186 gray_concrete/);
  assert.match(output, /fill ~-198 ~1 ~-110 ~-170 ~1 ~172 gray_concrete/);
  assert.match(output, /fill ~170 ~1 ~-110 ~198 ~1 ~172 gray_concrete/);
  assert.match(output, /fill ~-184 ~1 ~-18 ~-78 ~1 ~2 gray_concrete/);
  assert.match(output, /fill ~78 ~1 ~-18 ~184 ~1 ~2 gray_concrete/);
  assert.match(output, /fill ~-14 ~1 ~112 ~14 ~1 ~172 gray_concrete/);
  assert.match(output, /fill ~-98 ~1 ~98 ~-78 ~1 ~172 gray_concrete/);
  assert.match(output, /fill ~-58 ~1 ~126 ~-38 ~1 ~172 gray_concrete/);
  assert.doesNotMatch(output, /# Reference v26: grid-blueprint Greek-temple MOON PARK gate/);
  assert.doesNotMatch(output, /# Blueprint: moon-park-entry-gate/);
  assert.doesNotMatch(output, /drawPixelTextMirrored\("MOON PARK"/);
  assert.match(output, /# Reference v27: tall SpaceX-style Starship\/Super Heavy rocket, launch tower, chopstick arms, and clean pad blueprint/);
  assert.match(output, /# Blueprint: spacex-style-rocket-launch-complex/);
  assert.match(output, /# Blueprint box foundation\/rocket-pad-full-block-foundation: -54,1,-60 -> 54,1,38 stone/);
  assert.match(output, /# Blueprint box structure\/starship-super-heavy-stack-envelope: -9,6,-22 -> 9,128,-4 iron_block marker/);
  assert.match(output, /# Blueprint box structure\/orbital-launch-tower-envelope: -26,5,-30 -> -14,141,4 iron_block marker/);
  assert.match(output, /# Blueprint box structure\/chopstick-service-arms-envelope: -20,54,-19 -> -4,108,-5 iron_block marker/);
  assert.match(output, /fill ~-54 ~ ~-60 ~54 ~ ~38 stone/);
  assert.match(output, /fill ~-26 ~4 ~-30 ~-25 ~125 ~-29 iron_block/);
  assert.match(output, /fill ~-18 ~53 ~-19 ~-6 ~54 ~-17 iron_block/);
  assert.match(output, /fill ~-7 ~52 ~-19 ~-4 ~55 ~-17 black_concrete/);
  assert.match(output, /fill ~-5 ~81 ~-20 ~5 ~84 ~-20 black_concrete/);
  assert.match(output, /setblock ~ ~128 ~-12 sea_lantern/);
  assert.match(output, /# Reference v24: HQs keep open stairwells and use separated interiors for precise room-level editing/);
  assert.match(output, /# Reference v25: GREEN HQ second floor separates the residence bedroom from cinema props and uses realistic bed scale/);
  assert.match(output, /# Reference v14: red glass LASER MAZE on the left-middle side/);
  assert.match(output, /# Reference v14: right-middle rover speedway with layered race track/);
  assert.match(output, /# Reference v14: front-right crystal cave with purple sign and clustered crystals/);
  assert.match(output, /cobblestone/);
  assert.match(output, /stone_bricks/);
  assert.doesNotMatch(output, /# Reference v14: blocky sky clouds/);
  assert.doesNotMatch(output, /# Reference v14: left-front cyan parkour canyon/);
  assert.match(output, /fill ~-18 ~1 ~-226 ~18 ~1 ~-48 gray_concrete/);
  assert.match(output, /fill ~-1 ~1 ~-226 ~-1 ~1 ~-48 yellow_concrete/);
  assert.match(output, /fill ~1 ~1 ~-226 ~1 ~1 ~-48 yellow_concrete/);
  assert.match(output, /fill ~-82 ~1 ~-42 ~-42 ~1 ~-22 gray_concrete/);
  assert.match(output, /fill ~42 ~1 ~-42 ~82 ~1 ~-22 gray_concrete/);
  assert.doesNotMatch(output, /setblock ~-10 ~2 ~65 sea_lantern/);
  assert.doesNotMatch(output, /setblock ~2 ~2 ~65 sea_lantern/);
  assert.doesNotMatch(output, /setblock ~-10 ~2 ~87 sea_lantern/);
  assert.doesNotMatch(output, /setblock ~2 ~2 ~87 sea_lantern/);
  assert.match(output, /bookshelf/);
  assert.match(output, /crafting_table/);
  assert.match(output, /furnace/);
  assert.match(output, /chain/);
  assert.match(output, /lantern\["hanging_bit"=true\]/);
  assert.match(output, /barrel/);
  assert.match(output, /oak_trapdoor/);
  assert.match(output, /oak_stairs/);
  assert.match(output, /wooden_door\["door_hinge_bit"=false,"minecraft:cardinal_direction"="west","open_bit"=false,"upper_block_bit"=false\]/);
  assert.match(output, /wooden_door\["door_hinge_bit"=false,"minecraft:cardinal_direction"="east","open_bit"=false,"upper_block_bit"=false\]/);
  assert.match(output, /smooth_quartz_stairs\["upside_down_bit"=false,"weirdo_direction"=0\]/);
  assert.match(output, /ladder\["facing_direction"=3\]/);
  assert.match(output, /brown_concrete/);
  assert.match(output, /light_blue_concrete/);
  assert.match(output, /stone_pressure_plate/);
  assert.match(output, /# Reference v20: exterior HQ entry stairs connect flat roads to raised double doors/);
  assert.match(output, /fill ~87 ~5 ~-30 ~107 ~23 ~-21 air/);
  assert.match(output, /fill ~-117 ~5 ~-30 ~-97 ~23 ~-21 air/);
  assert.match(output, /fill ~73 ~1 ~-31 ~81 ~7 ~-21 air/);
  assert.match(output, /fill ~74 ~1 ~-30 ~75 ~1 ~-22 smooth_quartz_stairs/);
  assert.match(output, /fill ~-75 ~1 ~-30 ~-74 ~1 ~-22 smooth_quartz_stairs/);
  assert.match(output, /fill ~82 ~5 ~-30 ~82 ~12 ~-22 air/);
  assert.match(output, /fill ~-82 ~5 ~-30 ~-82 ~12 ~-22 air/);
  assert.match(output, /fill ~82 ~19 ~-31 ~82 ~31 ~-21 white_concrete/);
  assert.match(output, /fill ~-82 ~19 ~-31 ~-82 ~31 ~-21 white_concrete/);
  assert.match(output, /fill ~-121 ~20 ~-50 ~-84 ~30 ~-18 air/);
  assert.match(output, /fill ~-117 ~19 ~-30 ~-103 ~23 ~-21 air/);
  assert.match(output, /fill ~-102 ~19 ~-30 ~-97 ~19 ~-21 smooth_quartz/);
  assert.match(output, /# Reference v25: GREEN HQ bedroom is a dedicated residence zone with clear walking space around the real beds/);
  assert.match(output, /fill ~-121 ~20 ~-50 ~-103 ~28 ~-38 air/);
  assert.match(output, /fill ~-121 ~19 ~-50 ~-103 ~19 ~-38 oak_planks/);
  assert.match(output, /fill ~-120 ~19 ~-43 ~-117 ~19 ~-41 red_concrete/);
  assert.match(output, /setblock ~-119 ~20 ~-44 bed\["direction"=2,"head_piece_bit"=false,"occupied_bit"=false\]/);
  assert.match(output, /setblock ~-119 ~20 ~-45 bed\["direction"=2,"head_piece_bit"=true,"occupied_bit"=false\]/);
  assert.match(output, /setblock ~-118 ~20 ~-44 bed\["direction"=2,"head_piece_bit"=false,"occupied_bit"=false\]/);
  assert.match(output, /setblock ~-118 ~20 ~-45 bed\["direction"=2,"head_piece_bit"=true,"occupied_bit"=false\]/);
  assert.match(output, /fill ~-118 ~24 ~-42 ~-118 ~26 ~-42 chain/);
  assert.match(output, /setblock ~-118 ~23 ~-42 lantern\["hanging_bit"=true\]/);
  assert.match(output, /fill ~-105 ~20 ~-49 ~-105 ~22 ~-47 bookshelf/);
  assert.match(output, /setblock ~-106 ~20 ~-46 chest/);
  assert.match(output, /setblock ~-106 ~20 ~-44 barrel/);
  assert.doesNotMatch(output, /setblock ~-120 ~20 ~-45 barrel/);
  assert.doesNotMatch(output, /setblock ~-117 ~20 ~-45 barrel/);
  assert.doesNotMatch(output, /fill ~-105 ~20 ~-43 ~-105 ~22 ~-41 blackstone/);
  assert.doesNotMatch(output, /setblock ~-119 ~20 ~-47 bed\["direction"=2,"head_piece_bit"=true/);
  assert.doesNotMatch(output, /setblock ~-119 ~20 ~-48 bed/);
  assert.doesNotMatch(output, /setblock ~-119 ~20 ~-49 bed/);
  assert.doesNotMatch(output, /fill ~-119 ~20 ~-48 ~-111 ~20 ~-42 white_wool/);
  assert.doesNotMatch(output, /fill ~-119 ~21 ~-48 ~-111 ~21 ~-44 lime_wool/);
  assert.match(output, /fill ~-88 ~21 ~-48 ~-88 ~24 ~-46 glowstone/);
  assert.match(output, /fill ~-114 ~23 ~-17 ~-92 ~28 ~-17 white_wool/);
  assert.match(output, /setblock ~-102 ~23 ~-31 iron_block/);
  assert.match(output, /fill ~-116 ~22 ~-54 ~-88 ~30 ~-54 glass/);
  assert.match(output, /fill ~-121 ~22 ~-49 ~-121 ~29 ~-37 glass/);
  assert.match(output, /blue_carpet/);
  assert.match(output, /lime_carpet/);
  assert.match(output, /setblock ~99 ~5 ~-22 chest/);
  assert.match(output, /setblock ~-105 ~5 ~-22 chest/);
  assert.doesNotMatch(output, /fill ~82 ~5 ~-54 ~82 ~32 ~-16 blue_concrete/);
  assert.doesNotMatch(output, /fill ~-82 ~5 ~-54 ~-82 ~32 ~-16 lime_concrete/);
  assert.doesNotMatch(output, /fill ~-14 ~5 ~-146 ~14 ~5 ~-108 cobblestone/);
  assert.doesNotMatch(output, /fill ~-80 ~ ~-80 ~80 ~ ~80 light_gray_concrete/);
  assert.doesNotMatch(output, /# Poster edition:/);
  assert.doesNotMatch(output, /# Visual v5:/);
  assert.match(output, /function start/);
  assert.match(output, /function rescue/);
  assert.match(output, /tp @p ~ ~36 ~-218/);
  assert.ok(output.split("\n").length >= 1500);
  assert.ok(output.split("\n").length < 10000);
});

test("bedrock park keeps every fill command under the Bedrock per-command limit", () => {
  const output = buildBedrockThemeParkFunction({
    themeId: "moon-base",
    size: "big",
    edition: "bedrock",
    moduleIds: getModuleIds(),
    gentleMode: true,
  });
  const oversized = output
    .split("\n")
    .filter((line) => line.trim().startsWith("fill "))
    .map((line) => ({ line, volume: bedrockFillVolume(line) }))
    .filter((item) => item.volume > 32768);

  assert.deepEqual(oversized, []);
});

test("bedrock start rescue and clear functions include gameplay safety and cleanup", () => {
  const start = buildBedrockStartFunction();
  const rescue = buildBedrockRescueFunction();
  const clear = buildBedrockClearFunction();

  assert.match(start, /沿 37 格宽车行路网游玩/);
  assert.match(start, /37 格宽车行主路/);
  assert.match(start, /29 格宽外环路/);
  assert.match(start, /不要穿过火箭底座/);
  assert.match(start, /give @p minecart 1/);
  assert.match(rescue, /tp @p ~ ~18 ~/);
  assert.match(rescue, /SpaceX 风格黑色大门/);
  assert.match(clear, /乐园已清理/);
  assert.match(clear, /fill ~-212 ~-1 ~-232/);
});
