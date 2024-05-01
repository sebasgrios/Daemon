import { Client, Collection } from "discord.js";
import Enmap from "enmap";

import ICommand from "../interfaces/command.interface";

export default interface ExtendedClient extends Client {
    commands?: Collection<string, ICommand>
    music?: Enmap
}