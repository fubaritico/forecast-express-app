import { Request, Response } from 'express';
import {get3HourlyWeatherService, getWeatherDefaultForecastsService} from "@Services/get3HourlyWeatherService";

export const weatherController = (req: Request, res: Response) => {
    console.log(req.query);
    return res.send(req.query);
}

export const getWeatherController = async (req: RequestWithCoordinates, res: Response) => {
    const { query } = req;
    try {
        const response = await get3HourlyWeatherService(query)

        return res.status(200).send(response);
    } catch(err) {
        return res.status(500).send(err);
    }
}

export const getWeatherDefaultForecastsController = async (req: Request, res: Response) => {
    console.warn('getWeatherDefaultForecastsController')
    try {
        const response = await getWeatherDefaultForecastsService()

        return res.status(200).send(response);
    } catch(err) {
        return res.status(500).send(err);
    }
}
