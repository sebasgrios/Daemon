import { Client, Collection, REST, Routes } from 'discord.js';
import { getFilesByDir } from './files-by-dir';

export default class Utils {
    private client: Client;
    private commands: Collection<string, any>;

    constructor(client: Client) {
        this.client = client;
        this.commands = new Collection();
    }

    async loadCommands() {
        try {
            const commands = await getFilesByDir('commands');
            const applicationCommands = this.client.application?.commands;
        
            if (!applicationCommands) {
                console.error(`[❌] App hasn't permissions to read command files`);
                return;
            }
    
            commands.forEach((command: any) => {
                applicationCommands.create(command.data);
            });

            console.log(`[✅] Commands loaded`);
            
            //TODO rest api
            //401
/*             await new REST({ version: '10' }).setToken('token_example').put(
                Routes.applicationGuildCommands('client_id', 'guild_id'), {
                    body: commands
                }
            ) */
        } catch (error) {
            console.error(`[❌] There was an error loading commands: ${error}`);
        }
    }
}
