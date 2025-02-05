import { exec } from 'child_process';
import * as util from 'node:util';

import LoggerService from '@/src/logger';

const execAsync = util.promisify(exec);

export async function runCommand(script: string): Promise<void> {
    const logger = await LoggerService.getInstance();
    try {
        logger.info(`Executing script: ${script}`);
        const { stdout, stderr } = await execAsync(script);
        if (stdout) logger.info(stdout);
        if (stderr) logger.error(stderr);
        logger.info(`Script executed successfully: ${script}`);
    } catch (error) {
        logger.error(`Error executing script: ${error}`);
    }
}
