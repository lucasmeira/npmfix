"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanProject = cleanProject;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const i18n_1 = tslib_1.__importDefault(require("../i18n"));
const logger_1 = require("../logger");
const run_1 = require("./run");
async function cleanProject() {
    const projectDir = process.cwd();
    const dirsToDelete = ['node_modules', 'dist'];
    const filesToDelete = ['package-lock.json', 'tsconfig.tsbuildinfo'];
    logger_1.logger.info(i18n_1.default.t('startingClean'));
    await (0, run_1.runCommand)('npm cache clean --force');
    for (const dir of dirsToDelete) {
        const fullPath = path_1.default.join(projectDir, dir);
        if (fs_1.default.existsSync(fullPath)) {
            fs_1.default.rmSync(fullPath, { recursive: true, force: true });
            logger_1.logger.info(i18n_1.default.t('logsDirDeleted', { dir: fullPath }));
        }
    }
    for (const file of filesToDelete) {
        const filePath = path_1.default.join(projectDir, file);
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
            logger_1.logger.info(i18n_1.default.t('logsFileDeleted', { file: filePath }));
        }
    }
    logger_1.logger.info(i18n_1.default.t('cleanComplete'));
}
