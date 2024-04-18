import DiscordClient from "./client/client";

const discordClient = new DiscordClient();

const start = async () => {
    await discordClient.getClient(); // Get an unique client instance
    await discordClient.loadCommands(); // Load all commands
    await discordClient.loadEvents(); // Load all events
};

start().catch(error =>
    console.error(`[❌] There was an error starting the bot: ${error}`)
);

export default discordClient;