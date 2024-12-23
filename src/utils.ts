import fs from 'fs';
import path from 'path';

export function isNodeProject(dir: string): boolean {
    return fs.existsSync(path.join(dir, 'package.json'));
}

export function getDirsToDelete(dir: string): string[] {
    const dirsToDelete = ['node_modules', 'dist', 'build'];
    const tsconfigPath = path.join(dir, 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
        dirsToDelete.push('out');
    }
    return dirsToDelete;
}

export function fileLink(filePath: string): string {
    const fileUrl = `file://${filePath}`;
    return `\x1b[34m\x1b[4mClique para abrir o arquivo: ${fileUrl}\x1b[0m`;
}
