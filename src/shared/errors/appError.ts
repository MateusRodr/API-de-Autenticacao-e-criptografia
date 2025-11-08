export class AppError extends Error {
    public readonly statusCode: number;
    public readonly name:string;

    constructor(message: string, statusCode = 400, name = "AppError") {
        super(message);
        this.statusCode = statusCode;
        this.name = name;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}