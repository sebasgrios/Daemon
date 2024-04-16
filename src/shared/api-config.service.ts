import 'dotenv/config';

export class ApiConfigService {
    get isDevelopment () {
        return process.env.TZ === 'development';
    };

    get isProduction () {
        return process.env.TZ === 'production';
    };

    private getString (key: string, defaultValue?: string) {
        const value = process.env[key];
        
        if (value === undefined) {
            console.error(`[❌] ApiConfigService getString | There was an error founding ${key} key`);
            return defaultValue?.toString().replace(/\n/g, '\n');
        }

        return value.toString().replace(/\n/g, '\n');
    };

    get discordConfig () {
        return {
            token: this.getString('DISCORD_TOKEN'),
            clientId: this.getString('CLIENT_ID'),
        };
    }
}