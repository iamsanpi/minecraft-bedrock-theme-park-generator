# Importing Into Minecraft Bedrock

Use this guide after exporting a `.mcpack` from the local app.

Important: importing the `.mcpack` only installs the behavior pack. It does not create the map by itself. To build the map, activate the pack on a world and run `/function build` in that world.

## 1. Import The Pack

Open the generated `.mcpack` file.

On macOS, this usually launches Minecraft directly. Wait for Minecraft to show that the import succeeded.

If double-click does not work, open Minecraft Bedrock and use the system file picker or drag the `.mcpack` onto Minecraft if your platform supports it.

## 2. Create A Test World And Enable The Pack

In Minecraft Bedrock:

1. Click `Play`.
2. Click `Create New`.
3. Click `Create New World`.
4. Set `Default Game Mode` to `Creative`.
5. Turn `Cheats` on.
6. Choose `Flat` world type if your platform shows that option.
7. Open `Behavior Packs`.
8. Find the imported theme park pack under `Available`.
9. Click the pack, then click `Activate`.
10. Create the world.

Recommended world settings:

- Game mode: Creative
- Cheats: On
- World type: Flat, if available
- Simulation distance: at least 6 chunks
- Behavior pack: activate the imported theme park pack

Use a new test world while iterating. Large generated builds are easier to review and clear in a dedicated world.

## 3. Run The Build

Enter the world and stand where the center of the park should be. The generator builds relative to the player's position, so use an open area.

Run:

```text
/function build
```

Then run:

```text
/function start
```

`build` places the park. `start` gives the player the intended starting state and guidance.

If Minecraft shows namespaced function suggestions instead of plain names, use:

```text
/function kidspark/build
/function kidspark/start
```

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
