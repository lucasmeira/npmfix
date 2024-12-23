#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const yargs_1 = tslib_1.__importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const build_1 = require("./commands/build");
const clean_1 = require("./commands/clean");
const reinstall_1 = require("./commands/reinstall");
const run_1 = require("./commands/run");
const logger_1 = require("./logger");
const utils_1 = require("./utils");
logger_1.logger.info(`${i18next_1.default.t('logFilePath')} ${(0, utils_1.fileLink)((0, logger_1.getCurrentLogFile)())}`);
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .scriptName('npmfix')
    .usage('$0 [options]', i18next_1.default.t('usage'))
    .option('maxFiles', {
    alias: 'm',
    type: 'string',
    description: i18next_1.default.t('maxFiles'),
    default: '7d',
})
    .option('run', {
    alias: ['exec', 'e'],
    type: 'string',
    description: i18next_1.default.t('runDescription'),
    demandOption: false,
})
    .command('clean', i18next_1.default.t('cleanDescription'), () => (0, clean_1.cleanProject)())
    .alias('clean', 'c')
    .command('reinstall', i18next_1.default.t('reinstallDescription'), () => (0, reinstall_1.reinstallPackages)())
    .alias('reinstall', 'r')
    .command('build', i18next_1.default.t('buildDescription'), () => (0, build_1.buildProject)())
    .alias('build', 'b')
    .command('$0', i18next_1.default.t('defaultDescription'), () => { }, async (argv) => {
    if (argv.clean) {
        await yargs_1.default.parse('clean');
    }
    else if (argv.reinstall) {
        await yargs_1.default.parse('reinstall');
    }
    else if (argv.build) {
        await yargs_1.default.parse('build');
    }
    else {
        await (0, clean_1.cleanProject)();
        await (0, reinstall_1.reinstallPackages)();
        await (0, build_1.buildProject)();
        if (argv.run) {
            const script = argv.run;
            await (0, run_1.runCommand)(script);
        }
    }
})
    .help()
    .alias('help', 'h')
    .locale('en')
    .strict()
    .parse();
