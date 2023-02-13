import { Response } from 'express';
import { AppError, HttpCode } from './AppError';
import { exitHandler } from '../ExitHandler';

class ErrorHandler {
    public handleError(error: Error | AppError, response?: Response): void {
        console.log('handleError:');
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        } else {
            this.handleUntrustedError(error, response);
        }
    }

    public isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    private handleTrustedError(error: AppError, response: Response): void {
        console.log('handleTrustedError:');
        response.status(error.httpCode).json({ message: error.message });
    }

    private handleUntrustedError(error: Error | AppError, response?: Response): void {
        console.log('handleUntrustedError:');
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }

        console.log('Application encountered an untrusted error.');
        console.log(error);
        exitHandler.handleExit(1);
    }
}

export const errorHandler = new ErrorHandler();