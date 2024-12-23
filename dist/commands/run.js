"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = runCommand;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const util = tslib_1.__importStar(require("node:util"));
const logger_1 = require("../logger");
const execAsync = util.promisify(child_process_1.exec);
async function runCommand(script) {
    try {
        logger_1.logger.info(`Executing script: ${script}`);
        const { stdout, stderr } = await execAsync(script);
        if (stdout)
            logger_1.logger.info(stdout);
        if (stderr)
            logger_1.logger.error(stderr);
        logger_1.logger.info(`Script executed successfully: ${script}`);
    }
    catch (error) {
        logger_1.logger.error(`Error executing script: ${error}`);
    }
}
