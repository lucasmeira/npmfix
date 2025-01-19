import fs from 'fs';
import path from 'path';

import i18n from '../i18n';
import LoggerService from '../logger';
import { runCommand } from './run';

export async function cleanProject() {
    const logger = await LoggerService.getInstance();
    const projectDir = process.cwd();
    const dirsToDelete = ['node_modules', 'dist'];
    const filesToDelete = ['package-lock.json', 'tsconfig.tsbuildinfo'];

    logger.info(i18n.t('startingClean'));

    await runCommand('npm cache clean --force');

    for (const dir of dirsToDelete) {
        const fullPath = path.join(projectDir, dir);
        if (fs.existsSync(fullPath)) {
            fs.rmSync(fullPath, { recursive: true, force: true });
            logger.info(i18n.t('logsDirDeleted', { dir: fullPath }));
        }
    }

    for (const file of filesToDelete) {
        const filePath = path.join(projectDir, file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info(i18n.t('logsFileDeleted', { file: filePath }));
        }
    }

    logger.info(i18n.t('cleanComplete'));
}
