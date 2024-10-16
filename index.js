#!/usr/bin/env node

import inquirer from "inquirer";
import { program } from "commander";
import simpleGit from "simple-git";
import path from "path";
import fs from "fs";

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
    try {
      const git = simpleGit();
      const repoUrl = "https://github.com/diveshpanwar/react-starter-template"; // Your template repo
      const targetPath = path.join(process.cwd(), projectName);
      console.log(`Generating template ${targetPath}`);
      await git.clone(repoUrl, targetPath);

      // Remove the .git folder from the cloned repo (optional)
      fs.rmSync(path.join(targetPath, ".git"), {
        recursive: true,
        force: true,
      });

      console.log("Project setup is complete! Now run:");
      console.log(`cd ${projectName} && npm install && npm run dev`);
    } catch (error) {
      console.log(error);

      console.error("Failed to create the project:", error);
    }
  });

program.parse(process.argv);
