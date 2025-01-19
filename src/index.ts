#!/usr/bin/env node
import i18next from 'i18next';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import 'module-alias/register';

import { buildProject } from './commands/build';
import { cleanProject } from './commands/clean';
import { reinstallPackages } from './commands/reinstall';
import { runCommand } from './commands/run';
import LoggerService, { updateLoggerMaxFiles } from './logger';

(async function main() {
    const logger = await LoggerService.getInstance();
    logger.info('Logger initialized successfully.');
    await yargs(hideBin(process.argv))
        .scriptName('npmfix')
        .usage('$0 [options]', i18next.t('usage'))
        .option('maxFiles', {
            alias: 'm',
            type: 'string',
            description: i18next.t('maxFiles'),
            default: '7d',
        })
        .option('run', {
            alias: ['exec', 'e'],
            type: 'string',
            description: i18next.t('runDescription'),
            demandOption: false,
        })
        .command('clean', i18next.t('cleanDescription'), () => cleanProject())
        .alias('clean', 'c')
        .command('reinstall', i18next.t('reinstallDescription'), () => reinstallPackages())
        .alias('reinstall', 'r')
        .command('build', i18next.t('buildDescription'), () => buildProject())
        .alias('build', 'b')
        .command(
            '$0',
            i18next.t('defaultDescription'),
            () => {},
            async (argv) => {
                logger.info(`Default handler arguments: ${JSON.stringify(argv)}`);
                if (argv.maxFiles) {
                    updateLoggerMaxFiles(logger, argv.maxFiles);
                }
                if (argv.clean) {
                    await yargs.parse('clean');
                } else if (argv.reinstall) {
                    await yargs.parse('reinstall');
                } else if (argv.build) {
                    await yargs.parse('build');
                } else {
                    await cleanProject();
                    await reinstallPackages();
                    await buildProject();
                    if (argv.run) {
                        const script = argv.run as string;
                        await runCommand(script);
                    }
                }
            },
        )
        .help()
        .alias('help', 'h')
        .locale('en')
        .strict()
        .parse();
})();
