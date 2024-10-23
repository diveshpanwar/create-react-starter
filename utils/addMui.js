import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { packageVersions } from "../config.js";

export async function addMuiToPackageJson(targetDir, addIcons) {
  const packageJsonPath = path.join(targetDir, "package.json");

  try {
    // Read the existing package.json
    const packageJson = await fs.readJson(packageJsonPath);

    // Add MUI dependencies
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["@mui/material"] =
      packageVersions["@mui/material"];
    packageJson.dependencies["@emotion/react"] =
      packageVersions["@emotion/react"];
    packageJson.dependencies["@emotion/styled"] =
      packageVersions["@emotion/styled"];

    if (addIcons) {
      packageJson.dependencies["@mui/icons-material"] =
        packageVersions["@mui/icons-material"];
    }

    // Write the updated package.json back
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(chalk.cyan("Added Material UI to project."));
  } catch (err) {
    console.error(chalk.red(`Error updating package.json: ${err}`));
  }
}
