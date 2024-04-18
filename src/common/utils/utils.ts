import { Client, Collection, REST, Routes } from 'discord.js';
import { getFilesByDir } from './files-by-dir';
import { ApiConfigService } from '../../shared/api-config.service';

export default class Utils {
    private apiConfigService: ApiConfigService;
    private client: Client;
    private commands: Collection<string, any>;

    constructor(client: Client) {
        this.client = client;
        this.commands = new Collection();
        this.apiConfigService = new ApiConfigService();
    }

    async loadCommands() {
        console.info('[🔄] Loading commands...');
        try {
            const commands = await getFilesByDir('commands');
            const applicationCommands = this.client.application?.commands;

            if (!applicationCommands) {
                console.error(`[❌] App hasn't permissions to read commands`);
                return;
            }

            commands.forEach((command: any) => {
                applicationCommands.create(command.data);
            });

            await new REST({ version: '10' })
                .setToken(this.apiConfigService.discordConfig.token)
                .put(
                    Routes.applicationCommands(this.apiConfigService.discordConfig.clientId), {
                    body: {
                        data: commands.forEach(command => command.data.toJSON())
                    }
                })

            console.info(`[✅] Commands loaded`)
        } catch (error) {
            console.error(`[❌] There was an error loading commands: ${error}`);
        }
    }
}
