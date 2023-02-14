import { NextFunction, Request, Response } from "express";
import { errorHandler } from "@Utils/error/ErrorHandler";

type Errors = Error & {
    errors: Error[]
}

export const getErrorMiddleWare = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error encountered:', err.message || err);

    next(err);
};

export const onErrorMiddleWare = (err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
};

export const onValidationErrorMiddleware = (err: Errors, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key) => {
                errors[key] = err.errors[key].message;

                return errors;
            }, {}),
        });
    }

    return next(err);
}
