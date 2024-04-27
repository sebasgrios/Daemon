import DiscordClient from "./client/client";
import Music from "./music";
import { ErrorHandler } from "./shared/error.handler";

const discordClient = new DiscordClient();
export const musicClient = new Music()

const start = async () => {
    await discordClient.getClient(); // Get an unique client instance
    await discordClient.loadCommands(); // Load all commands
    await discordClient.loadEvents(); // Load all events
};

start().catch(error =>
    new ErrorHandler('🤖', 'There was an error starting the bot', error)
);

export default discordClient;