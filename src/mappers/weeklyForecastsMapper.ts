type ForecastDay = WeatherbitAPI.ForecastDay
type Forecast = WeatherbitAPI.Forecast

export const weeklyForecastsMapper = (
  forecasts: Forecast[]
): MappedForecast[] => {
  const mappedForecast: MappedForecast[] = forecasts.map(
    (forecast: Forecast): MappedForecast => {
      const mappedForecast: MappedForecast = {}

      mappedForecast.app_max_temp = forecast.app_max_temp
      mappedForecast.app_min_temp = forecast.app_min_temp
      mappedForecast.timestamp_local = forecast.timestamp_local
      mappedForecast.code = forecast.weather.code
      mappedForecast.icon = forecast.weather.icon
      mappedForecast.datetime = forecast.datetime
      mappedForecast.pod = forecast.pod

      return mappedForecast
    }
  )

  if (mappedForecast.length > 1) mappedForecast.shift()

  return mappedForecast
}
export const forecastDayMapper = (
  forecastDay: ForecastDay
): MappedForecastDay => {
  const mappedForecastDay: MappedForecastDay = {}

  mappedForecastDay.city_name = forecastDay.city_name
  mappedForecastDay.pod = forecastDay.data[0].pod
  mappedForecastDay.description = forecastDay.data[0].weather.description
  mappedForecastDay.icon = forecastDay.data[0].weather.icon
  mappedForecastDay.code = forecastDay.data[0].weather.code
  mappedForecastDay.timestamp_local = forecastDay.data[0].timestamp_local
  mappedForecastDay.app_max_temp = forecastDay.data[0].app_max_temp
  mappedForecastDay.app_min_temp = forecastDay.data[0].app_min_temp
  mappedForecastDay.wind_spd = forecastDay.data[0].wind_spd
  mappedForecastDay.dewpt = forecastDay.data[0].dewpt
  mappedForecastDay.rh = forecastDay.data[0].rh
  mappedForecastDay.pres = forecastDay.data[0].pres
  mappedForecastDay.vis = forecastDay.data[0].vis
  mappedForecastDay.temp = forecastDay.data[0].temp
  mappedForecastDay.weeklyForecasts = weeklyForecastsMapper(forecastDay.data)

  return mappedForecastDay
}
