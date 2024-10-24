import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { __dirname, packageVersions } from '../config.js';
import { copyFile } from './common.js';

// Path to the template directory
const snippetsDir = path.join(__dirname, 'snippets');

const originalImports = `import { StrictMode } from 'react'`;

const originalMainSnippet = `<App />`;

const updatedImports = `import { StrictMode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme } from './theme.tsx'`;

const updatedMainSnippet = `    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>`;

export async function addCustomMuiThemeToProject(targetDir) {
    const themeFolderPath = path.join(targetDir, 'src');
    const sourceThemePath = path.join(snippetsDir, 'mui/theme.tsx');
    const targetThemePath = path.join(themeFolderPath, 'theme.tsx');
    copyFile(sourceThemePath, targetThemePath);
}

export async function updateMainfile(targetDir) {
    const mainFilePath = path.join(targetDir, 'src/main.tsx');
    const content = await fs.readFile(mainFilePath, 'utf8');
    const updatedContent = content
        .replace(originalImports, updatedImports)
        .replace(originalMainSnippet, updatedMainSnippet);
    await fs.writeFile(mainFilePath, updatedContent);
}

export async function addMuiToPackageJson(targetDir, addIcons, useCustomTheme) {
    const packageJsonPath = path.join(targetDir, 'package.json');

    try {
        // Read the existing package.json
        console.log(chalk.cyan(`Updating ${chalk.yellow('package.json')}`));
        const packageJson = await fs.readJson(packageJsonPath);

        // Add MUI dependencies
        packageJson.dependencies = packageJson.dependencies || {};
        packageJson.dependencies['@mui/material'] =
            packageVersions['@mui/material'];
        packageJson.dependencies['@emotion/react'] =
            packageVersions['@emotion/react'];
        packageJson.dependencies['@emotion/styled'] =
            packageVersions['@emotion/styled'];

        if (addIcons) {
            packageJson.dependencies['@mui/icons-material'] =
                packageVersions['@mui/icons-material'];
        }

        if (useCustomTheme) {
            console.log(
                chalk.cyan(
                    `Generating custom theme file in ${chalk.yellow('src/')}`
                )
            );
            await addCustomMuiThemeToProject(targetDir);
            console.log(
                chalk.cyan(`Adding custom theme to ${chalk.yellow('main.tsx')}`)
            );
            await updateMainfile(targetDir);
        }

        // Write the updated package.json back
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log(chalk.magenta('\nAdded Material UI to project.'), '\n');
        console.log(
            chalk.grey(
                `You can also refer to the documentation: ${chalk.yellow(
                    'https://mui.com/material-ui/getting-started/usage/'
                )}`,
                '\n'
            )
        );
    } catch (err) {
        console.error(chalk.red(`Error updating package.json: ${err}`));
    }
}
