import { NextFunction, Request, Response } from 'express'
import {
  getDefaultObservationsService,
  getWeeklyForecastsService,
  getHourlyForecastsService,
  getCurrentObservationService,
} from '@Services/getWeatherService'
import {
  currentDefaultObservationsMapper,
  currentObservationMapper,
} from '../mappers/currentDefaultObservationsMapper'
import { forecastDayMapper } from '../mappers/dailyForecastsMapper'
import { hourlyDetailedForecastsMapper } from '../mappers/hourlyDetailedForecastsMapper'

export const getDefaultObservationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.observations = await getDefaultObservationsService()
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapDefaultObservationsController = (
  req: Request,
  res: Response
) => {
  const mappedResponse = currentDefaultObservationsMapper(
    res.locals.observations
  )
  res.status(200).send(mappedResponse)
}

export const getCurrentObservationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.observation = await getCurrentObservationService(req.query)
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapCurrentObservationController = (
  req: RequestWithExpectedParameters,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.mappedCurrentObservation = currentObservationMapper(
      res.locals.observation.data[0]
    )
    next()
  } catch (err) {
    res.status(200).send(err)
  }
}

export const getWeeklyForecastsController = async (
  req: RequestWithExpectedParameters,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.dailyForecasts = await getWeeklyForecastsService(req.query)
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapDailyForecastsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.mappedDailyForecasts = forecastDayMapper(
      res.locals.dailyForecasts,
      res.locals.mappedCurrentObservation
    )
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const getHourlyForecastsController = async (
  req: RequestWithExpectedParameters,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.hourlyForecasts = await getHourlyForecastsService(req.query)
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapDetailedForecastsController = (req: Request, res: Response) => {
  res.locals.mappedDailyForecasts.hourlyForecasts =
    hourlyDetailedForecastsMapper(res.locals.hourlyForecasts.data)
  res.status(200).send(res.locals.mappedDailyForecasts)
}
