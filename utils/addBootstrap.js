import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { packageVersions } from '../config.js';

const originalImports = `import App from './App.tsx'`;

const updatedImports = `import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'`;

export async function updateMainfile(targetDir) {
    const mainFilePath = path.join(targetDir, 'src/main.tsx');
    const content = await fs.readFile(mainFilePath, 'utf8');
    const updatedContent = content.replace(originalImports, updatedImports);
    await fs.writeFile(mainFilePath, updatedContent);
}

export async function addBootstrapToProject(targetDir) {
    const packageJsonPath = path.join(targetDir, 'package.json');

    try {
        // Read the existing package.json
        console.log(chalk.cyan(`Updating ${chalk.yellow('package.json')}`));
        const packageJson = await fs.readJson(packageJsonPath);

        // Add Sass as a dependency with the latest compatible version
        packageJson.dependencies = packageJson.dependencies || {};
        packageJson.dependencies['bootstrap'] = packageVersions['bootstrap']; // Or use any desired version or latest

        // Write the updated package.json back
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log(chalk.cyan(`Updating ${chalk.yellow('main.tsx')}`));
        await updateMainfile(targetDir);
        console.log(chalk.magenta('\nAdded Bootstrap to project'));
    } catch (err) {
        console.error(chalk.red(`Error updating package.json: ${err}`));
    }
}
