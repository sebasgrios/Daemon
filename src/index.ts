import DiscordClient from "./client";
import Utils from "./common/utils/utils";

const discordClient = new DiscordClient();

async function start(): Promise<void> {
    const client = await discordClient.getClient(); // Get an unique client instance

    const utils = new Utils(client);
    await utils.loadCommands();
}

start().catch(error => {
    console.error(`[❌] There was an error starting bot: ${error}`);
});

export default discordClient
