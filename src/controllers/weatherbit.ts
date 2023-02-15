import { NextFunction, Request, Response } from 'express'
import { getDefaultObservationsService } from '@Services/getWeatherService'
import { currentDefaultObservationsMapper } from '../mappers/currentDefaultObservationsMapper'

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
    res.locals.forecasts = response
    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export const mapDefaultObservationsController = (
  req: Request,
  res: Response
) => {
  const mappedResponse = currentDefaultObservationsMapper(res.locals.forecasts)
  res.status(200).send(mappedResponse)
}
