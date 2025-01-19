import fs from 'fs';
import path from 'path';

import i18next from 'i18next';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { fileLink } from './utils';

const ROOT_DIR = process.cwd();
const CONFIG_PATH = path.resolve(ROOT_DIR, 'config.json');

function getConfig(): { maxFiles: string } {
    if (fs.existsSync(CONFIG_PATH)) {
        const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
        return JSON.parse(configData);
    }
    return { maxFiles: '7d' };
}

function saveConfig(config: { maxFiles: string }) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}

export function updateLoggerMaxFiles(logger: winston.Logger, maxFiles: string) {
    const transport = logger.transports.find(
        (t) => t instanceof DailyRotateFile,
    ) as DailyRotateFile;
    if (transport) {
        transport.options.maxFiles = maxFiles;
    }
    saveConfig({ maxFiles });
    logger.info(`maxFiles changed to ${maxFiles}`);
}

function logFilePath() {
    const logDirectory = path.resolve(ROOT_DIR, 'logs');
    const fileName = `/log-%DATE%.log`;
    return {
        model: path.join(logDirectory, fileName),
        path: path
            .join(logDirectory, fileName)
            .replace('%DATE%', new Date().toISOString().split('T')[0]),
    };
}

async function initializeLogger(): Promise<winston.Logger> {
    const config = getConfig();
    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level}]: ${message}`;
            }),
        ),
        transports: [
            new DailyRotateFile({
                filename: logFilePath().model,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: config.maxFiles,
            }),
            new winston.transports.Console({
                format: winston.format.cli(),
            }),
        ],
    });
}

export default class LoggerService {
    private static instance: winston.Logger;
    private static path: string;

    private constructor() {}

    static async getInstance(): Promise<winston.Logger> {
        if (!LoggerService.instance) {
            LoggerService.instance = await initializeLogger();
            LoggerService.path = logFilePath().path;

            LoggerService.instance.info(
                `${i18next.t('logFilePath')} ${fileLink(LoggerService.path)}`,
            );
        }
        return LoggerService.instance;
    }

    static async getLoggerForClass(cls: Function): Promise<winston.Logger> {
        return (await this.getInstance()).child({ className: cls.name });
    }
}
