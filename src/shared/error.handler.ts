export class ErrorHandler {
    constructor(
        private icon: string,
        private errorMessage: string, 
        private error: unknown
    ) {
        console.error(`[❌] [${this.icon}] ${this.errorMessage}:`);
        console.error(this.error);
    }
}