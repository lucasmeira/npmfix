import fs from 'fs';
import path from 'path';

import winston, { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const CONFIG_PATH = path.resolve(__dirname, 'src/config.json');

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

const createLogFilePath = () => {
    const logDirectory = path.resolve(__dirname, 'logs');
    const fileName = `log-${new Date().toISOString().split('T')[0]}.log`;
    return path.join(logDirectory, fileName);
};

const config = getConfig();
const logger = createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
    ),
    transports: [
        new DailyRotateFile({
            filename: createLogFilePath(),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: config.maxFiles,
        }),
        new transports.Console({
            format: format.cli(),
        }),
    ],
});

function updateLoggerMaxFiles(maxFiles: string) {
    const transport = logger.transports.find(
        (t) => t instanceof DailyRotateFile,
    ) as DailyRotateFile;
    if (transport) {
        transport.options.maxFiles = maxFiles;
    }
    saveConfig({ maxFiles });
}

export const getCurrentLogFile = () => {
    return createLogFilePath();
};

export { logger, updateLoggerMaxFiles };
