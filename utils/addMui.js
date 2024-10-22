import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

export async function addMuiToPackageJson(targetDir, addIcons) {
  const packageJsonPath = path.join(targetDir, "package.json");

  try {
    // Read the existing package.json
    const packageJson = await fs.readJson(packageJsonPath);

    // Add MUI dependencies
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies["@mui/material"] = "^6.1.1";
    packageJson.dependencies["@emotion/react"] = "^11.13.3";
    packageJson.dependencies["@emotion/styled"] = "^11.13.0";

    if (addIcons) {
      packageJson.dependencies["@mui/icons-material"] = "^6.1.1";
    }

    // Write the updated package.json back
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(chalk.cyan("Added Material UI to project."));
  } catch (err) {
    console.error(chalk.red(`Error updating package.json: ${err}`));
  }
}
