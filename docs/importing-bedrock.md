# Importing Into Minecraft Bedrock

Use this guide after exporting a `.mcpack` from the local app.

## 1. Import The Pack

Open the generated `.mcpack` file.

On macOS, this usually launches Minecraft directly. Wait for Minecraft to show that the import succeeded.

If double-click does not work, open Minecraft Bedrock and use the system file picker or drag the `.mcpack` onto Minecraft if your platform supports it.

## 2. Create A Test World

Recommended world settings:

- Game mode: Creative
- Cheats: On
- World type: Flat, if available
- Simulation distance: at least 6 chunks
- Behavior pack: activate the imported theme park pack

Use a new test world while iterating. Large generated builds are easier to review and clear in a dedicated world.

## 3. Run The Build

Enter the world and stand where the center of the park should be.

Run:

```text
/function build
```

Then run:

```text
/function start
```

`build` places the park. `start` gives the player the intended starting state and guidance.

## 4. Rescue Or Clear

If you spawn in a bad place, run:

```text
/function rescue
```

If you want to remove the generated area, stand near the same center point used for generation and run:

```text
/function clear
```

## 5. If `/function build` Does Not Appear

Check these points:

- The behavior pack is active on the specific world, not only imported globally.
- Cheats are enabled for the world.
- You are using Minecraft Bedrock Edition, not Java Edition.
- Try typing only `/function ` and wait for autocomplete.
- If only namespaced functions appear, run `/function kidspark/build`.

## 6. Switch Or Console Notes

Nintendo Switch can import packs only through Minecraft-supported platform flows. If you do not want to use Realms, the practical local workflow is usually:

1. Iterate and export on the computer.
2. Test on Bedrock for desktop/mobile first.
3. Move to Switch only after the map is stable, using a platform-supported transfer method available to your account and device setup.

This repository does not automate Switch transfer.
