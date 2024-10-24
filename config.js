import path from 'path';
import { fileURLToPath } from 'url';

export const packageVersions = {
    sass: '^1.77.8',
    '@mui/material': '^6.1.1',
    '@emotion/react': '^11.13.3',
    '@emotion/styled': '^11.13.0',
    '@mui/icons-material': '^6.1.1',
    zustand: '^5.0.0',
    '@reduxjs/toolkit': '^2.3.0',
    'react-redux': '^9.1.2',
    bootstrap: '^5.3.3',
    'react-router': '^6.27.0',
    'react-router-dom': '^6.27.0',
    eslint: '^9.11.1',
    'eslint-config-prettier': '^9.1.0',
    'eslint-plugin-prettier': '^5.2.1',
    prettier: '^3.3.3',
};

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
