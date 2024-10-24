import fs from "fs-extra";
import path from "path";
import { __dirname } from "../config.js";
import { copyFolderStructure } from "./common.js";

// Path to the template directory

export async function addFolderStructureToProject(targetDir) {
    const srcFolderPath = path.join(__dirname, "folderStructure", "src");
    const destFolderPath = path.join(targetDir, "src");

    // Ensure the src/ folder exists
    if (!fs.existsSync(destFolderPath)) {
        fs.mkdirSync(destFolderPath, { recursive: true });
    }

    // Copy the folder structure
    copyFolderStructure(srcFolderPath, destFolderPath);
}
