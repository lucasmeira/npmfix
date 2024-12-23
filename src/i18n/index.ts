import i18next from 'i18next';

i18next.init({
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                defaultDescription:
                    'Executes the default sequence: clean, reinstall, and build processes.',
                usage: 'Manage your project with npmfix',
                scriptDescription: "Script to run with the 'run' command",
                runScriptRequired: 'Error: You must specify a script with --script or -s',
                cleanDescription: 'Clean the project directories',
                reinstallDescription: 'Reinstall project dependencies',
                runDescription: 'Run a custom script',
                maxFiles: 'Maximum age for log files',
                startingRun: 'Starting to execute the script: {{script}}',
                reinstallingPackages: 'Reinstalling packages...',
                logsDirDeleted: 'Deleting directory: {{dir}}',
                logsFileDeleted: 'Deleting file: {{file}}',
                reinstallSuccess: 'Packages reinstalled successfully.',
                reinstallFail: 'Failed to reinstall packages: {{message}}',
                logFilePath: 'Log file path: ',
            },
        },
        pt: {
            translation: {
                defaultDescription: 'Executa a sequência padrão: limpar, reinstalar e buildar.',
                usage: 'Gerencie seu projeto com o npmfix',
                scriptDescription: "Script para executar com o comando 'run'",
                runScriptRequired: 'Erro: Você deve especificar um script com --script ou -s',
                cleanDescription: 'Limpa os diretórios do projeto',
                reinstallDescription: 'Reinstala as dependências do projeto',
                runDescription: 'Executa um script personalizado',
                maxFiles: 'Tempo máxima para arquivos de log',
                startingRun: 'Iniciando a execução do script: {{script}}',
                reinstallingPackages: 'Reinstalando pacotes...',
                logsDirDeleted: 'Excluindo diretório: {{dir}}',
                logsFileDeleted: 'Excluindo arquivo: {{file}}',
                reinstallSuccess: 'Pacotes reinstalados com sucesso.',
                reinstallFail: 'Falha ao reinstalar pacotes: {{message}}',
                logFilePath: 'Caminho do arquivo de log: ',
            },
        },
    },
});

export default i18next;
