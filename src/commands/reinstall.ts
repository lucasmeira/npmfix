import i18n from '../i18n/index';
import { logger } from '../logger';
import { runCommand } from './run';

export async function reinstallPackages() {
    try {
        logger.info(i18n.t('reinstallingPackages'));
        await runCommand('npm install');
        logger.info(i18n.t('reinstallSuccess'));
    } catch (error: any) {
        logger.error(i18n.t('reinstallFail', { message: error.message }));
    }
}
