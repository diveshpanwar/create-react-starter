import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { __dirname, packageVersions } from '../config.js';
import { copyFile, createFolder } from './common.js';

// Path to the template directory
const snippetsDir = path.join(__dirname, 'snippets');

const originalImports = `import { StrictMode } from 'react'`;

const originalMainSnippet = `<App />`;

const updatedImports = `import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'`;

const updatedMainSnippet = `    <Provider store={store}>
      <App />
    </Provider>`;

export async function setupFilesForRedux(targetDir) {
    try {
        const storeFolderPath = path.join(targetDir, 'src/store');
        const storeSliceFolderPath = path.join(targetDir, 'src/store/slices');
        createFolder(storeFolderPath);
        createFolder(storeSliceFolderPath);
        // setup file counterStore.ts
        const sourceCounterStorePath = path.join(
            snippetsDir,
            'redux/reduxCounterSlice.ts'
        );
        const targetCounterStorePath = path.join(
            storeFolderPath,
            'slices/counterSlice.ts'
        );
        const sourceIndexStorePath = path.join(
            snippetsDir,
            'redux/reduxIndex.ts'
        );
        const targetIndexStorePath = path.join(storeFolderPath, 'index.ts');
        copyFile(sourceCounterStorePath, targetCounterStorePath);
        copyFile(sourceIndexStorePath, targetIndexStorePath);
    } catch (error) {
        console.error(
            chalk.red(`Error setting up files for Zustand: ${error}`)
        );
    }
}

export async function updateMainfile(targetDir) {
    const mainFilePath = path.join(targetDir, 'src/main.tsx');
    const content = await fs.readFile(mainFilePath, 'utf8');
    const updatedContent = content
        .replace(originalImports, updatedImports)
        .replace(originalMainSnippet, updatedMainSnippet);
    await fs.writeFile(mainFilePath, updatedContent);
}

export async function addReduxToProject(targetDir) {
    console.log(chalk.yellow('Setting up Redux...'), '\n');
    const packageJsonPath = path.join(targetDir, 'package.json');
    try {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.dependencies = packageJson.dependencies || {};
        packageJson.dependencies['@reduxjs/toolkit'] =
            packageVersions['@reduxjs/toolkit'];
        packageJson.dependencies['react-redux'] =
            packageVersions['react-redux'];
        // Write the updated package.json back
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        // Setup Redux files
        await setupFilesForRedux(targetDir);
        await updateMainfile(targetDir);
        console.log(chalk.magenta('\nAdded Redux to project.'), '\n');
        console.log(
            chalk.grey(
                `Example on using store is provided in ${chalk.yellow(
                    'src/store/index.ts'
                )}`,
                '\n'
            )
        );
        console.log(
            chalk.grey(
                `You can also refer to the documentation: ${chalk.yellow(
                    'https://redux.js.org/tutorials/quick-start'
                )}`,
                '\n'
            )
        );
    } catch (err) {
        console.error(chalk.red(`Error updating package.json: ${err}`));
    }
}
