import 'express-async-errors';
import { Router } from 'express';
import apiController from '@Controllers/api'
import {getErrorMiddleWare, onErrorMiddleWare, onValidationErrorMiddleware} from "@Middlewares/errors";
import {getWeatherController, getWeatherDefaultForecastsController, weatherController} from "@Controllers/weather";

const router = Router();

router.get('/api', apiController);

router.get('/api/weather', weatherController);

router.get('/api/weather/get', getWeatherController);

router.get('/api/weather/forecasts', getWeatherDefaultForecastsController);

router.use(onValidationErrorMiddleware);

router.use(getErrorMiddleWare);

router.use(onErrorMiddleWare);

export default router;
