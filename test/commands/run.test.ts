import { runCommand } from 'src/commands/run';
import { logger } from 'src/logger';

jest.mock('src/logger', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
    },
}));

describe('runCommand', () => {
    it('deve executar o comando echo e registrar a saída correta', async () => {
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
