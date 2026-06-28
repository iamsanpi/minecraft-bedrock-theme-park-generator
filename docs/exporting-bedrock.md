# Exporting A Bedrock Pack

This project exports a Minecraft Bedrock behavior pack as a `.mcpack` file. The pack contains functions that build the theme park inside a Bedrock world.

## 1. Start The Local Tool

```bash
npm install
npm run sync:minecraft-assets
npm start
```

Open the app:

```text
http://127.0.0.1:8765
```

`npm run sync:minecraft-assets` is optional, but recommended. It improves the browser preview by letting the renderer use local Bedrock vanilla textures.

## 2. Preview Before Exporting

Use the preview camera buttons:

- `效果图视角`
- `俯视`
- `火箭`
- `大门`
- `Logo细节`
- `绿楼二层`

The preview is generated from the same Bedrock function commands that are later packaged into the `.mcpack`. It should be treated as the first quality gate before importing into Minecraft.

## 3. Generate The Pack

Click:

```text
生成 Bedrock 地图包
```

The server writes a package under:

```text
exports/
```

The app also exposes a download link in the browser. The generated `.mcpack` is ignored by git because it is a build artifact.

## 4. Included Functions

The exported behavior pack includes:

```text
/function build
/function start
/function rescue
/function clear
```

Namespaced aliases are also generated:

```text
/function kidspark/build
/function kidspark/start
/function kidspark/rescue
/function kidspark/clear
```

The large build is split into smaller step functions so Minecraft Bedrock can load it more reliably.

Do not run `internal_steps/step_*` manually in Minecraft. They are implementation details used by `/function build`; running one of them can create only a partial map.

## 5. Quality Check Before Sharing

Run:

```bash
npm run validate
```

Then export again from the browser. If the validation fails, fix the generator before publishing a new `.mcpack`.
