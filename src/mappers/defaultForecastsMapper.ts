type CurrentForecast = WeatherAPI.CurrentForecast
type ForecastData = WeatherAPI.ForecastData

const currentForcastDataMapper = (forecastData: ForecastData): MappedForecast => {
    const mappedForecast: MappedForecast = {}

    mappedForecast.description = forecastData.weather.description
    mappedForecast.code = forecastData.weather.code
    mappedForecast.icon = forecastData.weather.icon
    mappedForecast.city_name = forecastData.city_name
    mappedForecast.sunrise = forecastData.sunrise
    mappedForecast.sunset = forecastData.sunset
    mappedForecast.app_temp = forecastData.app_temp
    mappedForecast.coordinates = {
        lat: forecastData.lat,
        lon: forecastData.lon
    }

    return mappedForecast
}

export const defaultForecastsMapper = (forecasts: CurrentForecast[]): MappedForecast[] => {
    return forecasts.map((forecast:CurrentForecast) => forecast.data.map((currentForeCastData: ForecastData) => {
        return currentForcastDataMapper(currentForeCastData)
    })).flat(1)
}
