import { NextFunction, Request, Response } from 'express'
import {
  getDefaultObservationsService,
  getWeeklyForecastsService,
  getHourlyForecastsService,
} from '@Services/getWeatherService'
import { currentDefaultObservationsMapper } from '../mappers/currentDefaultObservationsMapper'
import { forecastDayMapper } from '../mappers/weeklyForecastsMapper'
import { hourlyDetailedForecastsMapper } from '../mappers/hourlyDetailedForecastsMapper'

export const weatherController = (req: Request, res: Response) => {
  console.log('weatherController - req.query: ', req.query)
  console.log('weatherControllers - req: ', req.query)
  return res.send(req.query)
}

export const getDefaultObservationsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getDefaultObservationsService()
    res.locals.observations = response
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

export const getWeeklyForecastsController = async (
  req: RequestWithExpectedParameters,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getWeeklyForecastsService(req.query)
    res.locals.weeklyForecasts = response
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapWeeklyForecastsController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.mappedWeeklyForecasts = forecastDayMapper(
      res.locals.weeklyForecasts
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
    const response = await getHourlyForecastsService(req.query)
    res.locals.hourlyForecasts = response
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapDetailedForecastsController = (req: Request, res: Response) => {
  res.locals.mappedWeeklyForecasts.hourlyForecasts =
    hourlyDetailedForecastsMapper(res.locals.hourlyForecasts.data)
  res.status(200).send(res.locals.mappedWeeklyForecasts)
}
