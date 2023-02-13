// eslint-disable
import 'express-async-errors';
import { NextFunction, Request, Response, Router } from 'express';
import { errorHandler } from '../exceptions/ErrorHandler';
import { apiRouter } from './api';

const router = Router();

router.use('/api', apiRouter);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error First:');
    console.log('Error encountered:', err.message || err);

    next(err);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error Last:');
    errorHandler.handleError(err, res);
});

export default router;
