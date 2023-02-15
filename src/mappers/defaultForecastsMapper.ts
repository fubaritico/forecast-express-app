type Observations = WeatherAPI.Observations
type Observation = WeatherAPI.Observation

const currentForcastDataMapper = (forecastData: Observation): MappedForecast => {
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

export const defaultForecastsMapper = (forecasts: Observations[]): MappedForecast[] => {
    return forecasts.map((forecast:Observations) => forecast.data.map((currentForeCastData: Observation) => {
        return currentForcastDataMapper(currentForeCastData)
    })).flat(1)
}
