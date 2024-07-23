import HTTP_STATUS from 'http-status-codes';

export interface Error {
    message: string;
    status_code: number;
    status: string;
}

export interface ErrorResponse {
    message: string;
    status_code: number;
    status: string;
    serializeError(): Error;
}

export abstract class CustomError extends Error {
    abstract status: string;
    abstract status_code: number;

    constructor(message: string) {
        super(message);
    }

    serializeError(): Error {
        return {
            message: this.message,
            status_code: this.status_code,
            status: this.status
        };
    }
}

export class ServerError extends CustomError {
    status = 'error';
    status_code = HTTP_STATUS.SERVICE_UNAVAILABLE;

    constructor(message: string) {
        super(message);
    }
}

export class BadRequestError extends CustomError {
    status = 'error';
    status_code = HTTP_STATUS.BAD_REQUEST;

    constructor(message: string) {
        super(message);
    }
}

export class JOIValidationError extends CustomError {
    status = 'error';
    status_code = HTTP_STATUS.BAD_REQUEST;

    constructor(message: string) {
        super(message);
    }
}

export class NotFoundError extends CustomError {
    status = 'error';
    status_code = HTTP_STATUS.NOT_FOUND;

    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedError extends CustomError {
    status = 'error';
    status_code = HTTP_STATUS.UNAUTHORIZED;

    constructor(message: string) {
        super(message);
    }
}

export class FileTooLargeError extends CustomError {
    status = 'error';
    status_code = HTTP_STATUS.REQUEST_TOO_LONG;

    constructor(message: string) {
        super(message);
    }
}
