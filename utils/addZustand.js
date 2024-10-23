import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { __dirname, packageVersions } from "../config.js";
import { copyFile, createFolder } from "./common.js";

// Path to the template directory
const snippetsDir = path.join(__dirname, "snippets");

export async function setupFilesForZustand(targetDir) {
  try {
    const storeFolderPath = path.join(targetDir, "src/store");
    createFolder(storeFolderPath);
    // setup file counterStore.ts
    const sourceCounterStorePath = path.join(
      snippetsDir,
      "zustandCounterStore.ts"
    );
    const targetCounterStorePath = path.join(
      storeFolderPath,
      "counterStore.ts"
    );
    const sourceIndexStorePath = path.join(snippetsDir, "zustandIndex.ts");
    const targetIndexStorePath = path.join(storeFolderPath, "index.ts");
    copyFile(sourceCounterStorePath, targetCounterStorePath);
    copyFile(sourceIndexStorePath, targetIndexStorePath);
  } catch (error) {
    console.error(chalk.red(`Error setting up files for Zustand: ${err}`));
  }
}

export async function addZustandToProject(targetDir) {
  console.log(chalk.yellow("Setting up Zustand..."));
  const packageJsonPath = path.join(targetDir, "package.json");
  try {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["zustand"] = packageVersions["zustand"];
    // Write the updated package.json back
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    // Setup Zustand files
    setupFilesForZustand(targetDir);
    console.log(chalk.cyan("Added Zustand to project."));
  } catch (err) {
    console.error(chalk.red(`Error updating package.json: ${err}`));
  }
}
