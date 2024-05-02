import { ButtonInteraction, Collection, CommandInteraction } from "discord.js";

import IEvent from "../interfaces/event.interface";
import { getFilesByDir } from "../utils/files-by-dir";
import IEventType from "../interfaces/event-type.interface";
import ExtendedClient from "../client/extended-client.interface";
import { ErrorHandler } from "../../../shared/error.handler";
import IMusicInteractions from "../interfaces/music-interaction.interface";
import { ButtonActionHandler } from "./button.handler";
import CommandHandler from "./command.handler";
import MusicInteractionHandler from "./music-interaction.handler";

export default class EventHandler {
    private client: ExtendedClient;
    private commandHandler: CommandHandler;
    private musicInteractionHandler: MusicInteractionHandler
    private buttonHandler: ButtonActionHandler;
    private eventType: IEventType = {
        'interactionCreate': (interaction: any) => this.interactionCreateEvent(interaction),
    };
    private musicInteractions: IMusicInteractions = {
        'play': (interaction: CommandInteraction | ButtonInteraction) => this.musicInteractionHandler.playSong(interaction as CommandInteraction),
        'pause': (interaction: CommandInteraction | ButtonInteraction) => this.musicInteractionHandler.pauseSong(interaction),
        'pause-button': (interaction: CommandInteraction | ButtonInteraction) => this.musicInteractionHandler.pauseSong(interaction),
        'resume': (interaction: CommandInteraction | ButtonInteraction) => this.musicInteractionHandler.resumeSong(interaction),
        'resume-button': (interaction: CommandInteraction | ButtonInteraction) => this.musicInteractionHandler.resumeSong(interaction)
    }

    constructor(client: ExtendedClient, commandHandler: CommandHandler, musicInteractionHandler: MusicInteractionHandler) {
        this.client = client;
        this.commandHandler = commandHandler;
        this.buttonHandler = new ButtonActionHandler(this.client);
        this.musicInteractionHandler = musicInteractionHandler;

        this.buttonHandler.getButtonsFromFiles();
    }

    async getEventsFromFiles(): Promise<Collection<string, IEvent>> {
        const collection = new Collection<string, IEvent>();
        const files = await getFilesByDir('events');

        files.forEach(file => collection.set(file.data.name, file));

        return collection;
    }

    executeEvent(typeEvent: string, interaction: any) {
        const event = this.eventType[typeEvent];

        if (!event) {
            new ErrorHandler('🤖', 'There was an error trying to found an event', 'eventType not found');
        }

        event(interaction);
    }

    interactionCreateEvent(interaction: any) {
        if (interaction instanceof CommandInteraction) {
            const commandMusic = this.musicInteractions[interaction.commandName];

            if (!commandMusic) {
                const command = this.commandHandler.getCommands().get(interaction.commandName);

                if (!command) {
                    new ErrorHandler('🤖', 'There was an error trying to execute a command', `'${interaction.commandName}' command run wasnt found`);
                    return;
                }

                command?.run(this.client, interaction);
                return;
            }

            commandMusic(interaction);
        }

        if (interaction instanceof ButtonInteraction) {
            const buttonMusic = this.musicInteractions[interaction.customId];

            if (!buttonMusic) {                
                const button = this.buttonHandler.getButtons().get(interaction.customId);

                if (!button) {
                    new ErrorHandler('🤖', 'There was an error trying to execute a button', `'${interaction.customId}' button run wasnt found`);
                    return;
                }

                button?.run(this.client, interaction);
                return;
            }

            buttonMusic(interaction);
        }

    }
}
