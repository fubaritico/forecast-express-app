import {NextFunction, Request, Response} from 'express';
import {getWeatherService, getWeatherDefaultForecastsService} from "@Services/getWeatherService";
import {defaultForecastsMapper} from "../mappers/defaultForecastsMapper";

export const weatherController = (req: Request, res: Response) => {
    console.log('weatherController - req.query: ', req.query);
    console.log('weatherController - req: ', req.query);
    return res.send(req.query);
}

export const getWeatherController = async (req: RequestWithExpectedParameters, res: Response) => {
    const { query } = req;
    try {
        const response = await getWeatherService(query, '/current')

        return res.status(200).send(response);
    } catch(err) {
        return res.status(500).send(err);
    }
}

export const getWeatherDefaultForecastsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getWeatherDefaultForecastsService()
        res.locals.forecasts = response
        next()
    } catch(err) {
        res.status(500).send(err);
    }
}

export const mapWeatherDefaultForecastsController = (req: Request, res: Response) => {
    const mappedResponse = defaultForecastsMapper(res.locals.forecasts)
    res.status(200).send(mappedResponse);
}
