import type { Logger } from 'winston';

import { runCommand } from '@/src/commands/run';
import LoggerService from '@/src/logger';

jest.mock('@/src/logger', () => {
    return {
        getInstance: jest.fn().mockResolvedValue({
            info: jest.fn(),
            error: jest.fn(),
        }),
    };
});

describe('runCommand - Shell Command Execution and Logging', () => {
    let logger: Logger;
    beforeEach(async () => {
        logger = await LoggerService.getInstance();
    });

    it('should execute the echo command and log the correct output', async () => {
        const script = 'echo "Hello World!"';
        await runCommand(script);

        expect(logger.info).toHaveBeenNthCalledWith(1, `Executing script: ${script}`);
        expect(logger.info).toHaveBeenNthCalledWith(2, 'Hello World!\n');
        expect(logger.info).toHaveBeenNthCalledWith(3, `Script executed successfully: ${script}`);

        expect(logger.error).not.toHaveBeenCalled();
    });

    it('deve registrar erro ao executar um comando inválido', async () => {
        const invalidScript = 'invalid-command';

        await runCommand(invalidScript);

        expect(logger.info).toHaveBeenCalledWith(`Executing script: ${invalidScript}`);
        expect(logger.error).toHaveBeenCalled();
    });
});
