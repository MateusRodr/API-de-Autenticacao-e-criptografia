import { AppError } from "./appError";

export class TokenNotProvidedError extends AppError {
    constructor(message:string) {
        super(message, 401)
    }
}

