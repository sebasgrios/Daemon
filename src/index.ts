import DiscordClient from "./client";
import Utils from "./common/utils/utils";

const discordClient = new DiscordClient();

async function start() {
    const client = await discordClient.getClient(); // Obtener una única instancia del cliente

    const utils = new Utils(client);
    await utils.loadCommands();
}

start().catch(error => {
    console.error('Error al iniciar el bot:', error);
});

export default discordClient
