import 'express-async-errors';
import { Router } from 'express';
import apiController from '@Controllers/api'
import {getErrorMiddleWare, onErrorMiddleWare, onValidationErrorMiddleware} from "@Middlewares/errors";
import {
    getWeatherController,
    getWeatherDefaultForecastsController, mapWeatherDefaultForecastsController,
    weatherController
} from "@Controllers/weather";
import {getParamNameMiddleware, getSecondParamMiddleware} from "@Middlewares/parameters";

const router = Router();

router.route('/api').get(apiController);

router.route('/api/weather').get(weatherController);

router.route('/api/weather/forecasts').get(getWeatherDefaultForecastsController, mapWeatherDefaultForecastsController);

router.route('/api/weather/get').get(getWeatherController);

router.param('paramName', getParamNameMiddleware);

router.route('/api/weather/:paramName').get(weatherController);

router.param('secondParam', getSecondParamMiddleware);

router.route('/api/weather/:paramName/:secondParam').get(weatherController);

router.use(onValidationErrorMiddleware);

router.use(getErrorMiddleWare);

router.use(onErrorMiddleWare);

export default router;
