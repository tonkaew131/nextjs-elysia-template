export class UnauthorizedError extends Error {
    constructor(public message: string = 'Unauthorized') {
        super(message);
        this.name = 'Unauthorized';
    }
}
