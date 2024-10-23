import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { __dirname, packageVersions } from "../config.js";
import { copyFolderStructure } from "./common.js";

const originalImports = `import App from './App.tsx'`;

const updatedImports = `import CustomRouter from "./routes/index.tsx"`;

const originalContentStr = `<App />`;
const updatedContentStr = `<CustomRouter />`;

export async function updateMainfile(targetDir) {
  const mainFilePath = path.join(targetDir, "src/main.tsx");
  const content = await fs.readFile(mainFilePath, "utf8");
  const updatedContent = content
    .replace(originalImports, updatedImports)
    .replace(originalContentStr, updatedContentStr);
  await fs.writeFile(mainFilePath, updatedContent);
}

export async function setupFilesForRouter(targetDir) {
  console.log(chalk.cyan("Adding Router files"), "\n");
  const srcFolderPath = path.join(__dirname, "snippets", "react-router");
  const destFolderPath = path.join(targetDir, "src");

  // Ensure the src/ folder exists
  if (!fs.existsSync(destFolderPath)) {
    fs.mkdirSync(destFolderPath, { recursive: true });
  }

  // Copy the folder structure
  copyFolderStructure(srcFolderPath, destFolderPath);
}

export async function addRouterToProject(targetDir) {
  console.log(chalk.yellow("Setting up App Router..."), "\n");
  const packageJsonPath = path.join(targetDir, "package.json");
  try {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["react-router"] = packageVersions["react-router"];
    packageJson.dependencies["react-router-dom"] =
      packageVersions["react-router-dom"];
    // Write the updated package.json back
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    // Setup Router files
    await setupFilesForRouter(targetDir);
    await updateMainfile(targetDir);
    console.log(chalk.magenta("\nAdded Router to project."), "\n");
    console.log(
      chalk.grey(
        `You can also refer to the documentation: ${chalk.yellow(
          "https://reactrouter.com/en/main/start/tutorial"
        )}`,
        "\n"
      )
    );
  } catch (err) {
    console.error(chalk.red(`Error updating package.json: ${err}`));
  }
}
