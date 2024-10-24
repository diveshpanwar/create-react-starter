import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { __dirname, packageVersions } from "../config.js";
import { copyFolderStructure } from "./common.js";

export async function setupFilesForPrettier(targetDir) {
    console.log(chalk.cyan("Adding Prettier files"));
    const srcFolderPath = path.join(__dirname, "snippets", "prettier");
    const destFolderPath = path.join(targetDir);

    // Ensure the src/ folder exists
    if (!fs.existsSync(destFolderPath)) {
        fs.mkdirSync(destFolderPath, { recursive: true });
    }

    // Copy the folder structure
    copyFolderStructure(srcFolderPath, destFolderPath);
}

export async function addPrettierToProject(targetDir) {
    const packageJsonPath = path.join(targetDir, "package.json");
    try {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.devDependencies = packageJson.devDependencies || {};
        packageJson.devDependencies["prettier"] = packageVersions["prettier"];
        packageJson.devDependencies["eslint"] = packageVersions["eslint"];
        packageJson.devDependencies["eslint-config-prettier"] =
            packageVersions["eslint-config-prettier"];
        packageJson.devDependencies["eslint-plugin-prettier"] =
            packageVersions["eslint-plugin-prettier"];

        // Write the updated package.json back
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        await setupFilesForPrettier(targetDir);
        console.log(chalk.magenta("\nAdded Prettier to project."));
    } catch (err) {
        console.error(chalk.red(`Error updating package.json: ${err}`));
    }
}
