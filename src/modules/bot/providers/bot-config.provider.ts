import { clientConfig } from "../config/config";
import { BotConfigService } from "../services/bot-config.service";

const providers = {
    'BotConfigProvider': new BotConfigService(),
    'clientConfigProvider': clientConfig
}

export default providers;