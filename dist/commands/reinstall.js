"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reinstallPackages = reinstallPackages;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("../i18n/index"));
const logger_1 = require("../logger");
const run_1 = require("./run");
async function reinstallPackages() {
    try {
        logger_1.logger.info(index_1.default.t('reinstallingPackages'));
        await (0, run_1.runCommand)('npm install');
        logger_1.logger.info(index_1.default.t('reinstallSuccess'));
    }
    catch (error) {
        logger_1.logger.error(index_1.default.t('reinstallFail', { message: error.message }));
    }
}
