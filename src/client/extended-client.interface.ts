import { Client } from "discord.js";
import Enmap from "enmap";

export default interface ExtendedClient extends Client {
    music?: Enmap
}