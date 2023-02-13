import { Router } from 'express';
import { weatherRouter } from './weather';

export const apiRouter = Router();

// http://localhost:9000/api/
apiRouter.get('/', (req, res) => {
  res.status(200).send('All is fine');
});

// http://localhost:9000/api/weather and some dynamic params
apiRouter.use('/weather', weatherRouter);

apiRouter.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});
