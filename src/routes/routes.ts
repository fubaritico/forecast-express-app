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
  mapCurrentObservationController,
  getCurrentObservationController,
} from '@Controllers/weatherbit'

const router = Router()

router.route('/api').get(apiController)

router
  .route('/api/weatherbit/currents')
  .get(getDefaultObservationsController, mapDefaultObservationsController)

router
  .route('/api/weatherbit/forecasts/weekly')
  .get(getWeeklyForecastsController, mapDailyForecastsController)

router
  .route('/api/weatherbit/forecasts/detail')
  .get(
    getCurrentObservationController,
    mapCurrentObservationController,
    getWeeklyForecastsController,
    mapDailyForecastsController,
    getHourlyForecastsController,
    mapDetailedForecastsController
  )

router.use(onValidationErrorMiddleware)

router.use(getErrorMiddleWare)

router.use(onErrorMiddleWare)

export default router
