import chalk from "chalk";

export const insertLine = () => {
  console.log("");
  const line = chalk.grey("_______________________________________________");
  console.log(line);
  console.log("");
};
