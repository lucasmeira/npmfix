import i18n from '../i18n/index';
import LoggerService from '../logger';
import { runCommand } from './run';

export async function reinstallPackages() {
    const logger = await LoggerService.getInstance();
    try {
        logger.info(i18n.t('reinstallingPackages'));
        await runCommand('npm install');
        logger.info(i18n.t('reinstallSuccess'));
    } catch (error: any) {
        logger.error(i18n.t('reinstallFail', { message: error.message }));
    }
}
