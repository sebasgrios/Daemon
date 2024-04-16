import { client } from "../../index";
import { getFilesByDir } from "./files-by-dir";

export default class Utils {
    private client;

    constructor () {
        this.client = client;
    }

    loadCommands () {
        const test = getFilesByDir('commands');
        // TODO: resolve promise returned
        console.log(test);
        
        return null;
    }
}