export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message); // Call the parent constructor with the error message
        this.status = status; // Set the custom status
        this.name = 'CustomError'; // Set the error name
    }
}