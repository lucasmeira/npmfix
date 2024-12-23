"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.getCurrentLogFile = void 0;
exports.updateLoggerMaxFiles = updateLoggerMaxFiles;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const winston_1 = tslib_1.__importStar(require("winston"));
const winston_daily_rotate_file_1 = tslib_1.__importDefault(require("winston-daily-rotate-file"));
const CONFIG_PATH = path_1.default.resolve(__dirname, '../config.json');
function getConfig() {
    if (fs_1.default.existsSync(CONFIG_PATH)) {
        const configData = fs_1.default.readFileSync(CONFIG_PATH, 'utf8');
        return JSON.parse(configData);
    }
    return { maxFiles: '7d' };
}
function saveConfig(config) {
    fs_1.default.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}
const createLogFilePath = () => {
    const logDirectory = path_1.default.resolve(__dirname, 'logs');
    const fileName = `log-${new Date().toISOString().split('T')[0]}.log`;
    return path_1.default.join(logDirectory, fileName);
};
const config = getConfig();
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: createLogFilePath(),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: config.maxFiles,
        }),
        new winston_1.transports.Console({
            format: winston_1.format.cli(),
        }),
    ],
});
exports.logger = logger;
function updateLoggerMaxFiles(maxFiles) {
    const transport = logger.transports.find((t) => t instanceof winston_daily_rotate_file_1.default);
    if (transport) {
        transport.options.maxFiles = maxFiles;
    }
    saveConfig({ maxFiles });
}
const getCurrentLogFile = () => {
    return createLogFilePath();
};
exports.getCurrentLogFile = getCurrentLogFile;
