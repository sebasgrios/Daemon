import { ButtonInteraction, Collection, CommandInteraction } from "discord.js";
import { EventEmitter } from "events";

import IEvent from "../interfaces/event.interface";
import { getFilesByDir } from "../utils/files-by-dir";
import IEventType from "../interfaces/event-type.interface";
import ExtendedClient from "../client/extended-client.interface";
import { ErrorHandler } from "../../../shared/error.handler";
import IMusicInteractions from "../interfaces/music-interaction.interface";
import { ButtonActionHandler } from "../component/buttons/handlers/button.handler";

export default class EventHandler extends EventEmitter {
    private client: ExtendedClient;
    private buttonHandler: ButtonActionHandler;
    private eventType: IEventType = {
        'interactionCreate': (interaction: any) => this.interactionCreateEvent(interaction),
    };
    private musicInteractions: IMusicInteractions = {
        'play': (interaction: CommandInteraction | ButtonInteraction) => this.emit('play-song', { interaction }),
        'pause': (interaction: CommandInteraction | ButtonInteraction) => this.emit('pause-song', { interaction }),
        'pause-button': (interaction: CommandInteraction | ButtonInteraction) => this.emit('pause-song', { interaction }),
        'resume': (interaction: CommandInteraction | ButtonInteraction) => this.emit('resume-song', { interaction }),
        'resume-button': (interaction: CommandInteraction | ButtonInteraction) => this.emit('resume-song', { interaction })
    }

    constructor(client: ExtendedClient) {
        super();
        this.client = client;
        this.buttonHandler = new ButtonActionHandler(this.client);
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
                new ErrorHandler('🤖', 'There was an error trying to execute a command', `'${interaction.commandName}' wasnt found in musicInteractions`);
                return;
            }

            commandMusic(interaction);
        }

        if (interaction instanceof ButtonInteraction) {
            const buttonMusic = this.musicInteractions[interaction.customId];

            if (!buttonMusic) {
                new ErrorHandler('🤖', 'There was an error trying to execute a button', `'${interaction.customId}' wasnt found in musicInteractions`);
                return;
            }

            buttonMusic(interaction);
        }

    }
}
