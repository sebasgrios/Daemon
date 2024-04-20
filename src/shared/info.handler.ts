export class InfoHandler {
    constructor(
        private icon: string,
        private errorMessage: string,
        private status: 'ok' | 'loading',
        private lineBreak: boolean = false
    ) {
        console.info(`[${this.getIconStatus()}] [${this.icon}] ${this.errorMessage}`);
        if (lineBreak) console.info();
    }

    getIconStatus () {
        if (this.status === 'ok') {
            return '✅';
        }
        if (this.status === 'loading') {
            return '🔄';
        }

        return;
    }
}