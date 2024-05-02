import { MusicEventsList } from "../../music/events/event.types";
import MusicEventEmitter from "../../music/events/music.event.emitter";

export default class MusicInteractionEventHandler {

    constructor(
        musicEventEmitter: MusicEventEmitter
    ) {
        musicEventEmitter.on(MusicEventsList.playing_song, this.generateDjPanel.bind(this))
    }

    generateDjPanel() {
        console.log('HACE COSAS')
        /**
         * TOD@
         * coger de la cache si está reproduciendo una canción
         * 
         * si se está reproduciendo generar panel de dj
         * 
         * si no se está reproduciendo mostrar notificación temporal de que se ha añadid a la cola 
         * y modificar el panel de dj añadiendo la cola
         */

    }

    pauseSong() {
        // TOD@ cambiar el estado del mensaje
    }
}