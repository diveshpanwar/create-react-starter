#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";
import { addMuiToPackageJson } from "./utils/addMui.js";
import {
  addSassToPackageJson,
  renameCssToScss,
  updateImportsToScss,
} from "./utils/addSass.js";
import { insertLine } from "./utils/common.js";

// Resolve the equivalent of __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the template directory
const templateDir = path.join(__dirname, "template");

program
  .version("1.0.0")
  .description("Create a new Vite + Material-UI React app")
  .option("-n, --name <project-name>", "Name of the project")
  .action(async (options) => {
    let projectName = options.name;
    if (!projectName) {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "What is the name of the project?",
          default: "react-starter-project", // default project name
        },
      ]);

      projectName = answers.projectName;
    }

    const { useSass } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useSass",
        message: "Do you want to use Sass (with .scss files)?",
        default: true,
      },
    ]);

    const { useMUI } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useMUI",
        message: "Do you want to use React Material (mui)?",
        default: true,
      },
    ]);

    if (useMUI) {
      const { useMUIIcon } = await inquirer.prompt([
        {
          type: "confirm",
          name: "useMUIIcon",
          message: "Do you want to use Material Icons?",
          default: true,
        },
      ]);
    }

    try {
      const targetPath = path.join(process.cwd(), projectName);
      console.log(chalk.yellow(`Generating template ${targetPath}`));
      insertLine();
      await fs.copy(templateDir, targetPath);
      console.log(chalk.green("Template generated successfully!"));
      if (useSass) {
        insertLine();
        console.log(chalk.magenta(`Adding Sass to the project`, "\n"));
        await addSassToPackageJson(targetPath);
        await renameCssToScss(targetPath);
        await updateImportsToScss(targetPath);
      }

      if (useMUI) {
        insertLine();
        console.log(chalk.magenta(`Adding MUI to the project`, "\n"));
        await addMuiToPackageJson(targetPath);
      }
      insertLine();
      console.log(chalk.green("Project setup is complete!", "\n"));
      console.log(
        chalk.cyan(`Please run command:`),
        chalk.yellow(`'cd ${projectName} && npm install && npm run dev'`)
      );
    } catch (error) {
      console.error(chalk.red("Failed to create the project:"), error);
    }
  });

program.parse(process.argv);
