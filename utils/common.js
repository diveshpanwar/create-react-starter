import chalk from "chalk";
import fs from "fs-extra";

export const insertLine = () => {
  console.log("");
  const line = chalk.grey("_______________________________________________");
  console.log(line);
  console.log("");
};

export async function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

export function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
}
