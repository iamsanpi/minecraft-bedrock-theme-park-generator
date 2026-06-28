import { createServer } from "node:http";
import { copyFile, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { cwd, env } from "node:process";
import { homedir } from "node:os";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  buildBedrockClearFunction,
  buildBedrockRescueFunction,
  buildBedrockStartFunction,
  buildBedrockThemeParkFunction,
  buildMinecraftClearFunction,
  buildMinecraftFunction,
} from "./dist/index.js";

const rootDir = cwd();
const publicDir = join(rootDir, "public");
const exportDir = join(rootDir, "exports");
const minecraftAssetsDir = resolve(
  env.MINECRAFT_BEDROCK_RESOURCE_PACK ||
    join(homedir(), ".cache/minecraft-kids-map-tool/bedrock-samples/v1.26.30.5/resource_pack"),
);
const savesDir = join(homedir(), "Library/Application Support/minecraft/saves");
const port = Number(env.PORT || "8765");
const host = "127.0.0.1";

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".png", "image/png"],
  [".mcpack", "application/octet-stream"],
]);

function sendJson(response, status, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  response.end(body);
}

async function parseJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

function safeWorldName(name) {
  if (typeof name !== "string") return "";
  const trimmed = name.trim();
  if (!trimmed || trimmed.includes("/") || trimmed.includes("\\") || trimmed === "." || trimmed === "..") {
    return "";
  }
  return trimmed;
}

async function listJavaWorlds() {
  try {
    const entries = await readdir(savesDir, { withFileTypes: true });
    const worlds = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const levelPath = join(savesDir, entry.name, "level.dat");
      try {
        await stat(levelPath);
        worlds.push({ name: entry.name, path: join(savesDir, entry.name) });
      } catch {
        // Skip folders that are not Minecraft Java saves.
      }
    }
    return worlds.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

async function writeDatapack(targetRoot, config) {
  const packRoot = join(targetRoot, "kidsmap-tool");
  const functionDir = join(packRoot, "data/kidsmap/functions");
  await mkdir(functionDir, { recursive: true });
  await writeFile(
    join(packRoot, "pack.mcmeta"),
    `${JSON.stringify(
      {
        pack: {
          pack_format: 48,
          supported_formats: [48, 99],
          description: "Kids Map Tool - local family Minecraft map",
        },
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(join(functionDir, "build.mcfunction"), buildMinecraftFunction(config));
  await writeFile(join(functionDir, "clear.mcfunction"), buildMinecraftClearFunction());
  await writeFile(
    join(packRoot, "README.txt"),
    [
      "Kids Map Tool",
      "",
      "In Minecraft Java Edition:",
      "1. Open the target world.",
      "2. Make sure cheats are enabled.",
      "3. Stand where the center of the map should be.",
      "4. Run: /reload",
      "5. Run: /function kidsmap:build",
      "",
      "To clear the generated build area, stand at the same center and run:",
      "/function kidsmap:clear",
      "",
    ].join("\n"),
  );
  return packRoot;
}

async function zipDirectory(sourceDir, outputPath) {
  await rm(outputPath, { force: true });
  await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn("/usr/bin/zip", ["-qr", outputPath, "."], { cwd: sourceDir });
    child.on("error", rejectPromise);
    child.on("close", (code) => {
      if (code === 0) {
        resolvePromise();
      } else {
        rejectPromise(new Error(`zip failed with exit code ${code}`));
      }
    });
  });
}

function splitMcfunction(source, maxLines = 180) {
  const lines = source.trimEnd().split("\n");
  const chunks = [];
  for (let index = 0; index < lines.length; index += maxLines) {
    chunks.push(`${lines.slice(index, index + maxLines).join("\n")}\n`);
  }
  return chunks;
}

function buildBedrockDispatcher(stepCount) {
  const lines = [
    "# Small dispatcher so Bedrock can list /function build even when the park is large.",
    "gamerule commandblockoutput false",
    'tellraw @a {"rawtext":[{"text":"§bKids Map Tool: 开始分段生成最终版月亮基地乐园..."}]}',
  ];

  for (let index = 1; index <= stepCount; index += 1) {
    const step = String(index).padStart(2, "0");
    lines.push(`function build_steps/step_${step}`);
  }

  lines.push(
    'tellraw @a {"rawtext":[{"text":"§a分段生成命令已执行完。下一步运行：/function start"}]}',
    "",
  );
  return lines.join("\n");
}

async function writeBedrockPack(config) {
  const packName = "Kids Moon Base Theme Park Final v29 Aligned Rocket Gantry";
  const packRoot = join(exportDir, "bedrock-kids-theme-park-pack");
  const functionsDir = join(packRoot, "functions");
  const functionsRoot = join(functionsDir, "kidspark");
  const buildStepsRoot = join(functionsDir, "build_steps");
  await rm(packRoot, { recursive: true, force: true });
  await mkdir(functionsRoot, { recursive: true });
  await mkdir(buildStepsRoot, { recursive: true });
  const buildFunction = buildBedrockThemeParkFunction(config);
  const buildChunks = splitMcfunction(buildFunction);
  const buildDispatcher = buildBedrockDispatcher(buildChunks.length);
  const startFunction = buildBedrockStartFunction(config);
  const rescueFunction = buildBedrockRescueFunction(config);
  const clearFunction = buildBedrockClearFunction(config);
  await writeFile(
    join(packRoot, "manifest.json"),
    `${JSON.stringify(
      {
        format_version: 2,
        header: {
          name: packName,
          description: "Generates a large child-friendly Bedrock theme park with /function build.",
          uuid: randomUUID(),
          version: [1, 0, 29],
          min_engine_version: [1, 20, 0],
        },
        modules: [
          {
            type: "data",
            uuid: randomUUID(),
            version: [1, 0, 29],
          },
        ],
      },
      null,
      2,
    )}\n`,
  );
  for (const [index, chunk] of buildChunks.entries()) {
    const step = String(index + 1).padStart(2, "0");
    await writeFile(join(buildStepsRoot, `step_${step}.mcfunction`), chunk);
  }
  await writeFile(join(functionsRoot, "build.mcfunction"), buildDispatcher);
  await writeFile(join(functionsRoot, "start.mcfunction"), startFunction);
  await writeFile(join(functionsRoot, "rescue.mcfunction"), rescueFunction);
  await writeFile(join(functionsRoot, "clear.mcfunction"), clearFunction);
  await writeFile(join(functionsDir, "build.mcfunction"), buildDispatcher);
  await writeFile(join(functionsDir, "start.mcfunction"), startFunction);
  await writeFile(join(functionsDir, "rescue.mcfunction"), rescueFunction);
  await writeFile(join(functionsDir, "clear.mcfunction"), clearFunction);
  await writeFile(
    join(packRoot, "README.txt"),
    [
      "Kids Moon Base Theme Park - Bedrock",
      "",
      "Import this .mcpack into Minecraft Bedrock.",
      "Create or open a creative flat world with cheats enabled.",
      "Apply this behavior pack to the world.",
      "Stand where the center of the theme park should be.",
      "Run:",
      "/function build",
      "/function start",
      "",
      "If the player is stuck or cannot find the park, run:",
      "/function rescue",
      "",
      `Build is split into ${buildChunks.length} smaller step functions so Bedrock can load the main build function.`,
      "The park includes a space-launch entrance, vehicle-scale road grid, central rocket, launch tower, HQ buildings, laser maze, rover speedway, crystal area, and rescue/start helpers.",
      "",
      "The namespaced commands are also included:",
      "/function kidspark/build",
      "/function kidspark/start",
      "/function kidspark/rescue",
      "",
      "To clear the generated area later, stand at the same center and run:",
      "/function clear",
      "/function kidspark/clear",
      "",
    ].join("\n"),
  );
  await mkdir(exportDir, { recursive: true });
  const mcpackPath = join(exportDir, "kids-moon-base-theme-park-final-v29-aligned-rocket-gantry.mcpack");
  await zipDirectory(packRoot, mcpackPath);
  await copyFile(mcpackPath, join(exportDir, "kids-moon-base-theme-park.mcpack"));
  return { packRoot, mcpackPath };
}

async function handleExport(request, response) {
  const body = await parseJson(request);
  const config = body.config;
  if (!config || typeof config !== "object") {
    sendJson(response, 400, { error: "Missing config." });
    return;
  }

  const worldName = safeWorldName(body.worldName);
  let targetRoot;
  let mode;

  if (worldName) {
    const worldRoot = resolve(savesDir, worldName);
    const normalizedSaves = `${normalize(savesDir)}/`;
    if (!`${normalize(worldRoot)}/`.startsWith(normalizedSaves)) {
      sendJson(response, 400, { error: "Invalid world name." });
      return;
    }
    const levelPath = join(worldRoot, "level.dat");
    try {
      await stat(levelPath);
    } catch {
      sendJson(response, 404, { error: "Minecraft world not found.", savesDir });
      return;
    }
    targetRoot = join(worldRoot, "datapacks");
    mode = "world";
  } else {
    targetRoot = exportDir;
    mode = "folder";
  }

  await mkdir(targetRoot, { recursive: true });
  const datapackPath = await writeDatapack(targetRoot, config);
  sendJson(response, 200, {
    mode,
    datapackPath,
    savesDir,
    nextSteps: ["/reload", "/function kidsmap:build"],
  });
}

async function handleBedrockExport(request, response) {
  const body = await parseJson(request);
  const config = body.config;
  if (!config || typeof config !== "object") {
    sendJson(response, 400, { error: "Missing config." });
    return;
  }
  const result = await writeBedrockPack(config);
  sendJson(response, 200, {
    mode: "bedrock-mcpack",
    packRoot: result.packRoot,
    mcpackPath: result.mcpackPath,
    downloadUrl: `/downloads/${result.mcpackPath.split("/").pop()}`,
    nextSteps: ["/function build", "/function start", "/function kidspark/build", "/function kidspark/start"],
  });
}

async function handleBedrockPreview(request, response) {
  const body = await parseJson(request);
  const config = body.config;
  if (!config || typeof config !== "object") {
    sendJson(response, 400, { error: "Missing config." });
    return;
  }
  const commandText = buildBedrockThemeParkFunction(config);
  const lines = commandText.split("\n").filter((line) => line.trim());
  sendJson(response, 200, {
    mode: "bedrock-preview",
    commands: commandText,
    lineCount: lines.length,
    fillCount: lines.filter((line) => line.trimStart().startsWith("fill ")).length,
    setblockCount: lines.filter((line) => line.trimStart().startsWith("setblock ")).length,
  });
}

async function serveDownload(pathname, method, response) {
  const filename = pathname.replace("/downloads/", "");
  if (!filename || filename.includes("/") || filename.includes("\\") || !filename.endsWith(".mcpack")) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const filePath = resolve(exportDir, filename);
  if (!`${normalize(filePath)}`.startsWith(`${normalize(exportDir)}/`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const fileStat = await stat(filePath);
    response.writeHead(200, {
      "content-type": "application/octet-stream",
      "content-length": fileStat.size,
      "content-disposition": `attachment; filename="${filename}"`,
    });
    if (method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

async function serveMinecraftAsset(pathname, method, response) {
  const relativePath = pathname.replace("/minecraft-assets/", "");
  if (!relativePath || relativePath.includes("\\") || relativePath.split("/").some((part) => part === "..")) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  const filePath = resolve(minecraftAssetsDir, relativePath);
  if (!`${normalize(filePath)}`.startsWith(`${normalize(minecraftAssetsDir)}/`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file.");
    const type = contentTypes.get(extname(filePath)) ?? "application/octet-stream";
    response.writeHead(200, { "content-type": type, "content-length": fileStat.size });
    if (method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Minecraft asset not found. Run: npm run sync:minecraft-assets");
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url || "/", `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = resolve(publicDir, `.${requestedPath}`);

  if (!`${normalize(filePath)}`.startsWith(`${normalize(publicDir)}/`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file.");
    const type = contentTypes.get(extname(filePath)) ?? "application/octet-stream";
    response.writeHead(200, { "content-type": type });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${host}:${port}`);
    if (request.method === "GET" && url.pathname === "/api/worlds") {
      sendJson(response, 200, { savesDir, worlds: await listJavaWorlds() });
      return;
    }
    if (request.method === "POST" && url.pathname === "/api/export-java") {
      await handleExport(request, response);
      return;
    }
    if (request.method === "POST" && url.pathname === "/api/export-bedrock") {
      await handleBedrockExport(request, response);
      return;
    }
    if (request.method === "POST" && url.pathname === "/api/preview-bedrock") {
      await handleBedrockPreview(request, response);
      return;
    }
    if ((request.method === "GET" || request.method === "HEAD") && url.pathname.startsWith("/downloads/")) {
      await serveDownload(url.pathname, request.method, response);
      return;
    }
    if ((request.method === "GET" || request.method === "HEAD") && url.pathname.startsWith("/minecraft-assets/")) {
      await serveMinecraftAsset(url.pathname, request.method, response);
      return;
    }
    if (request.method === "GET" || request.method === "HEAD") {
      await serveStatic(request, response);
      return;
    }
    response.writeHead(405);
    response.end("Method not allowed");
  } catch (error) {
    sendJson(response, 500, { error: error instanceof Error ? error.message : "Unknown server error." });
  }
});

server.listen(port, host, () => {
  console.log(`Kids Map Tool running at http://${host}:${port}/`);
});
