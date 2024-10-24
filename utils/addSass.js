import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { packageVersions } from "../config.js";

// Function to update package.json with Sass
export async function addSassToPackageJson(targetDir) {
    const packageJsonPath = path.join(targetDir, "package.json");

    try {
        // Read the existing package.json
        console.log(chalk.cyan(`Updating ${chalk.yellow("package.json")}`));
        const packageJson = await fs.readJson(packageJsonPath);

        // Add Sass as a dependency with the latest compatible version
        packageJson.dependencies = packageJson.dependencies || {};
        packageJson.dependencies["sass"] = packageVersions["sass"]; // Or use any desired version or latest

        // Write the updated package.json back
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log(chalk.cyan("Added Sass to project"));
    } catch (err) {
        console.error(chalk.red(`Error updating package.json: ${err}`));
    }
}

// Function to rename .css files to .scss
export async function renameCssToScss(targetDir) {
    const indexCssPath = path.join(targetDir, "src/index.css");
    const appCssPath = path.join(targetDir, "src/App.css");

    const indexScssPath = path.join(targetDir, "src/index.scss");
    const appScssPath = path.join(targetDir, "src/App.scss");

    try {
        // Rename index.css to index.scss
        if (await fs.pathExists(indexCssPath)) {
            await fs.rename(indexCssPath, indexScssPath);
            console.log(
                chalk.cyan(
                    `Renamed ${chalk.yellow("index.css")} to ${chalk.yellow(
                        "index.scss"
                    )}`
                )
            );
        }

        // Rename App.css to App.scss
        if (await fs.pathExists(appCssPath)) {
            await fs.rename(appCssPath, appScssPath);
            console.log(
                chalk.cyan(
                    `Renamed ${chalk.yellow("App.css")} to ${chalk.yellow("App.scss")}`
                )
            );
        }
    } catch (err) {
        console.error(chalk.red(`Error renaming CSS files to SCSS: ${err}`));
    }
}

export // Function to update imports in main.tsx and App.tsx
async function updateImportsToScss(targetDir) {
    const mainTsxPath = path.join(targetDir, "src/main.tsx");
    const appTsxPath = path.join(targetDir, "src/App.tsx");

    try {
        // Update main.tsx
        if (await fs.pathExists(mainTsxPath)) {
            let mainTsxContent = await fs.readFile(mainTsxPath, "utf8");
            mainTsxContent = mainTsxContent.replace(
                `import './index.css'`,
                `import './index.scss'`
            );
            await fs.writeFile(mainTsxPath, mainTsxContent);
            console.log(
                chalk.cyan(
                    `Updated ${chalk.yellow("main.tsx")} to import ${chalk.yellow(
                        "index.scss"
                    )}`
                )
            );
        }

        // Update App.tsx
        if (await fs.pathExists(appTsxPath)) {
            let appTsxContent = await fs.readFile(appTsxPath, "utf8");
            appTsxContent = appTsxContent.replace(
                `import './App.css'`,
                `import './App.scss'`
            );
            await fs.writeFile(appTsxPath, appTsxContent);
            console.log(
                chalk.cyan(
                    `Updated ${chalk.yellow("App.tsx")} to import ${chalk.yellow(
                        "App.scss"
                    )}`
                )
            );
        }

        console.log(chalk.magenta("Added SASS to the project."));
    } catch (err) {
        console.error(chalk.red(`Error updating imports to .scss: ${err}`));
    }
}
