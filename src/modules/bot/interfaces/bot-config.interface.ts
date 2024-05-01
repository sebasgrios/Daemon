import IDiscordConfig from "./discord-config.interface";

export default interface IBotConfigProvider {
    isDevelopment: boolean;
    isProduction: boolean;
    discordConfig: IDiscordConfig;
};