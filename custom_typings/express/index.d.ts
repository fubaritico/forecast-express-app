declare namespace Express {
    interface Request {
        paramName?: string
        secondParam?: string

        test: WeatherAPI.CurrentForecast[]
    }
}