import 'express-async-errors'
import { Router } from 'express'
import apiController from '@Controllers/api'
import {
  getErrorMiddleWare,
  onErrorMiddleWare,
  onValidationErrorMiddleware,
} from '@Middlewares/errors'
import {
  getDefaultObservationsController,
  getHourlyForecastsController,
  getWeeklyForecastsController,
  mapDefaultObservationsController,
  mapDetailedForecastsController,
  mapDailyForecastsController,
  weatherController,
} from '@Controllers/weatherbit'
import {
  getParamNameMiddleware, // Simple experiment
  getSecondParamMiddleware, // Simple experiment
} from '@Middlewares/parameters'

const router = Router()

router.route('/api').get(apiController)

router.route('/api/weatherbit').get(weatherController)

router
  .route('/api/weatherbit/currents')
  .get(getDefaultObservationsController, mapDefaultObservationsController)

router
  .route('/api/weatherbit/forecasts/weekly')
  .get(getWeeklyForecastsController, mapDailyForecastsController)

router
  .route('/api/weatherbit/forecasts/detail')
  .get(
    getWeeklyForecastsController,
    mapDailyForecastsController,
    getHourlyForecastsController,
    mapDetailedForecastsController
  )

router.param('paramName', getParamNameMiddleware)

router.route('/api/weatherbit/:paramName').get(weatherController)

router.param('secondParam', getSecondParamMiddleware)

router.route('/api/weatherbit/:paramName/:secondParam').get(weatherController)

router.use(onValidationErrorMiddleware)

router.use(getErrorMiddleWare)

router.use(onErrorMiddleWare)

export default router
