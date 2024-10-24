import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { __dirname, packageVersions } from "../config.js";
import { copyFolderStructure } from "./common.js";

export async function addTailwindConfigs(targetDir) {
  const sourceConfigPath = path.join(__dirname, "snippets/tailwind/config");
  const targetConfigPath = path.join(targetDir);
  copyFolderStructure(sourceConfigPath, targetConfigPath);
}

export async function addTailwindCssFile(targetDir) {
  const sourceCssPath = path.join(__dirname, "snippets/tailwind/style");
  const targetCssPath = path.join(targetDir, "src");
  copyFolderStructure(sourceCssPath, targetCssPath);
}

export async function addTailwindAppFile(targetDir) {
  const sourceAppPath = path.join(__dirname, "snippets/tailwind/template");
  const targetAppPath = path.join(targetDir, "src");
  copyFolderStructure(sourceAppPath, targetAppPath);
}

export async function addTailwindToProject(targetDir) {
  const packageJsonPath = path.join(targetDir, "package.json");

  try {
    // Read the existing package.json
    console.log(chalk.cyan(`Updating ${chalk.yellow("package.json")}`));
    const packageJson = await fs.readJson(packageJsonPath);

    // Add MUI dependencies
    packageJson.devDependencies = packageJson.devDependencies || {};
    packageJson.devDependencies["postcss"] = packageVersions["postcss"];
    packageJson.devDependencies["tailwindcss"] = packageVersions["tailwindcss"];
    packageJson.devDependencies["autoprefixer"] =
      packageVersions["autoprefixer"];

    // Write the updated package.json back
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(chalk.cyan("Setting up files for tailwind"));
    await addTailwindCssFile(targetDir);
    await addTailwindAppFile(targetDir);
    await addTailwindConfigs(targetDir);

    console.log(chalk.magenta("\nAdded Tailwind CSS to project."));
    console.log(
      chalk.grey(
        `You can also refer to the documentation: ${chalk.yellow(
          "https://tailwindcss.com/docs/installation",
        )}`,
      ),
    );
  } catch (err) {
    console.error(chalk.red(`Error updating package.json: ${err}`));
  }
}
