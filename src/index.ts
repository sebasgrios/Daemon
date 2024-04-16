import DiscordClient from "./client";
import Utils from "./common/utils/utils";

export const client = new DiscordClient().getClient();
const utils = new Utils().loadCommands();