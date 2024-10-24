#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { __dirname } from "./config.js";
import { addBootstrapToProject } from "./utils/addBootstrap.js";
import { addMuiToPackageJson } from "./utils/addMui.js";
import { addReduxToProject } from "./utils/addRedux.js";
import {
  addSassToPackageJson,
  renameCssToScss,
  updateImportsToScss,
} from "./utils/addSass.js";
import { addZustandToProject } from "./utils/addZustand.js";
import { insertLine } from "./utils/common.js";
import { addFolderStructureToProject } from "./utils/addFolderStructure.js";
import { addRouterToProject } from "./utils/addRouter.js";
import { addPrettierToProject } from "./utils/addPrettier.js";

// Path to the template directory
const templateDir = path.join(__dirname, "template");

program
  .version("1.8.2")
  .description("Create a new React app")
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

    const targetPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetPath)) {
      console.log(
        chalk.red(
          `Error: The folder '${chalk.yellow(
            targetPath
          )}' already exists. Please use a different name.`
        )
      );
      process.exit(1); // Exit the process if the folder exists
    }

    const { useSass } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useSass",
        message: "Do you want to use Sass (with .scss files)?",
        default: true,
      },
    ]);

    const { usePrettier } = await inquirer.prompt([
      {
        type: "confirm",
        name: "usePrettier",
        message: "Do you want to use prettier?",
        default: true,
      },
    ]);

    const { stylingLibraryAnswer } = await inquirer.prompt([
      {
        type: "list",
        name: "stylingLibraryAnswer",
        message: "Which styling library do you want to use?",
        choices: ["MUI", "Bootstrap", "None"],
        default: "MUI",
      },
    ]);

    let useMUIIconFlag = false;
    let useCustomThemeFlag = false;
    if (stylingLibraryAnswer && stylingLibraryAnswer.toLowerCase() === "mui") {
      const { useMUIIcon, useCustomTheme } = await inquirer.prompt([
        {
          type: "confirm",
          name: "useMUIIcon",
          message: "Do you want to use Material Icons?",
          default: true,
        },
        {
          type: "confirm",
          name: "useCustomTheme",
          message: "Do you want to use customtTheme?",
          default: true,
        },
      ]);
      useMUIIconFlag = useMUIIcon;
      useCustomThemeFlag = useCustomTheme;
    }

    const { storeAnswer } = await inquirer.prompt([
      {
        type: "list",
        name: "storeAnswer",
        message: "Which state management library do you want to use?",
        choices: ["Redux", "Zustand", "None"],
        default: "Zustand",
      },
    ]);

    const { useRouter } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useRouter",
        message: "Do you want to add router to your project?",
        default: false,
      },
    ]);

    const { useFolderStructure } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useFolderStructure",
        message:
          "Do you want to add a folder Structure to your React Project (small to medium sized projects)?",
        default: false,
      },
    ]);

    try {
      // generate template
      console.log(chalk.yellow(`Generating template ${targetPath}`));
      insertLine();
      await fs.copy(templateDir, targetPath);
      console.log(chalk.green("Template generated successfully!"));

      // add sass
      if (useSass) {
        insertLine();
        console.log(chalk.magenta(`Adding Sass to the project...`, "\n"));
        await addSassToPackageJson(targetPath);
        await renameCssToScss(targetPath);
        await updateImportsToScss(targetPath);
      }

      // add store
      if (storeAnswer.toLowerCase() === "zustand") {
        insertLine();
        console.log(chalk.magenta(`Adding Zustand to the project...`, "\n"));
        await addZustandToProject(targetPath);
      } else if (storeAnswer.toLowerCase() === "redux") {
        insertLine();
        console.log(chalk.magenta(`Adding Redux to the project...`, "\n"));
        await addReduxToProject(targetPath);
      }

      // add style library
      if (stylingLibraryAnswer.toLowerCase() === "mui") {
        insertLine();
        console.log(chalk.magenta(`Adding MUI to the project...`, "\n"));
        await addMuiToPackageJson(
          targetPath,
          useMUIIconFlag,
          useCustomThemeFlag
        );
      } else if (stylingLibraryAnswer.toLowerCase() === "bootstrap") {
        insertLine();
        console.log(chalk.magenta(`Adding bootstrap to the project...`, "\n"));
        await addBootstrapToProject(targetPath);
      }

      // add Router to the project
      if (useRouter) {
        insertLine();
        console.log(chalk.magenta(`Adding Router to the project...`, "\n"));
        // add router
        await addRouterToProject(targetPath);
      }

      if (usePrettier) {
        insertLine();
        console.log(
          chalk.magenta(`Configuring Prettier for the project...`, "\n")
        );
        await addPrettierToProject(targetPath);
      }

      // add folder structure
      if (useFolderStructure) {
        insertLine();
        console.log(
          chalk.magenta(`Adding folder structure to the project...`, "\n")
        );
        await addFolderStructureToProject(targetPath);
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
