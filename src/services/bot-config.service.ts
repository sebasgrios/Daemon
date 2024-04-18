import 'dotenv/config';
import IBotConfigProvider from '../interfaces/bot-config.interface';
import IDiscordConfig from "../interfaces/discord-config.interface";

export class BotConfigService implements IBotConfigProvider {
    get isDevelopment () {
        return process.env.TZ === 'development';
    };

    get isProduction () {
        return process.env.TZ === 'production';
    };

    private getString (key: string, defaultValue: string = '') : string {
        const value = process.env[key];
        
        if (value === undefined) {
            console.error(`[❌] ApiConfigService getString | There was an error founding ${key} key`);
            return defaultValue?.toString().replace(/\n/g, '\n');
        }

        return value.toString().replace(/\n/g, '\n');
    };

    get discordConfig (): IDiscordConfig {
        return {
            token: this.getString('DISCORD_TOKEN'),
            clientId: this.getString('CLIENT_ID'),
        };
    }
};