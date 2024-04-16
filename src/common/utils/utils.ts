import { client } from "../../index";
import { getFilesByDir } from "./files-by-dir";

export default class Utils {
    private client;

    constructor () {
        this.client = client;
    }

    loadCommands () {
        console.info('[🔄] Loading commands...');

        getFilesByDir('commands')
        .then(moduleExports => console.log(moduleExports))
        .catch(error => console.error(`[❌] Utils loadCommands | There was an error getting commands ${error}`));
        
        // TODO set commands to client and rest

        return null;
    }
}