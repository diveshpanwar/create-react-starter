#!/usr/bin/env node

import inquirer from "inquirer";
import { program } from "commander";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import {
  addSassToPackageJson,
  renameCssToScss,
  updateImportsToScss,
} from "./utils/addSass.js";

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
        default: false,
      },
    ]);

    try {
      const targetPath = path.join(process.cwd(), projectName);
      console.log(`Generating template ${targetPath}`);
      await fs.copy(templateDir, targetPath);
      if (useSass) {
        await addSassToPackageJson(targetPath);
        await renameCssToScss(targetPath);
        await updateImportsToScss(targetPath);
      }
      console.log("Project setup is complete! Now run:");
      console.log(`cd ${projectName} && npm install && npm run dev`);
    } catch (error) {
      console.log(error);
      console.error("Failed to create the project:", error);
    }
  });

program.parse(process.argv);
