import { runCommand } from './run';

export const buildProject = async () => {
    return runCommand('npm run build');
};
