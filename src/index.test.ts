import { runCommand } from './commands/run';
import { logger } from './logger';

jest.mock('./logger', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
    },
}));

describe('runCommand', () => {
    it('deve executar o comando echo e registrar a saída correta', async () => {
        const script = 'echo "Hello World!"';
        await runCommand(script);

        // Check each specific log message
        expect(logger.info).toHaveBeenNthCalledWith(1, `Executing script: ${script}`);
        expect(logger.info).toHaveBeenNthCalledWith(2, 'Hello World!\n'); // Ensure newline is handled
        expect(logger.info).toHaveBeenNthCalledWith(3, `Script executed successfully: ${script}`);

        // Ensure no errors were logged
        expect(logger.error).not.toHaveBeenCalled();
    });

    it('deve registrar erro ao executar um comando inválido', async () => {
        const invalidScript = 'invalid-command';

        await runCommand(invalidScript);

        expect(logger.info).toHaveBeenCalledWith(`Executing script: ${invalidScript}`);
        expect(logger.error).toHaveBeenCalled(); // Espera que logger.error seja chamado com uma mensagem de erro
    });
});
