'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const run_1 = require('src/commands/run');
const logger_1 = require('src/logger');
jest.mock('src/logger', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
    },
}));
describe('runCommand', () => {
    it('deve executar o comando echo e registrar a saída correta', async () => {
        const script = 'echo "Hello World!"';
        await (0, run_1.runCommand)(script);
        expect(logger_1.logger.info).toHaveBeenNthCalledWith(1, `Executing script: ${script}`);
        expect(logger_1.logger.info).toHaveBeenNthCalledWith(2, 'Hello World!\n');
        expect(logger_1.logger.info).toHaveBeenNthCalledWith(
            3,
            `Script executed successfully: ${script}`,
        );
        expect(logger_1.logger.error).not.toHaveBeenCalled();
    });
    it('deve registrar erro ao executar um comando inválido', async () => {
        const invalidScript = 'invalid-command';
        await (0, run_1.runCommand)(invalidScript);
        expect(logger_1.logger.info).toHaveBeenCalledWith(`Executing script: ${invalidScript}`);
        expect(logger_1.logger.error).toHaveBeenCalled();
    });
});
