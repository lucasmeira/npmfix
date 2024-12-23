"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeProject = isNodeProject;
exports.getDirsToDelete = getDirsToDelete;
exports.fileLink = fileLink;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
function isNodeProject(dir) {
    return fs_1.default.existsSync(path_1.default.join(dir, 'package.json'));
}
function getDirsToDelete(dir) {
    const dirsToDelete = ['node_modules', 'dist', 'build'];
    const tsconfigPath = path_1.default.join(dir, 'tsconfig.json');
    if (fs_1.default.existsSync(tsconfigPath)) {
        dirsToDelete.push('out');
    }
    return dirsToDelete;
}
function fileLink(filePath) {
    const fileUrl = `file://${filePath}`;
    return `\x1b[34m\x1b[4mClique para abrir o arquivo: ${fileUrl}\x1b[0m`;
}
