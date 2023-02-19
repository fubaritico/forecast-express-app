import {
  dateToProps,
  getFormattedDateFromTimezone,
  toKmPerHour,
} from '@Utils/convert'
import {
  applyCelsiusDegreesLong,
  applyCelsiusDegreesShort,
  applyKilometers,
  applyKmPerHour,
  applyMillibars,
  applyPercentage,
} from '@Utils/units'

type ForecastDay = WeatherbitAPI.ForecastDay
type Forecast = WeatherbitAPI.Forecast

export const dailyForecastsMapper = (
  forecasts: Forecast[]
): MappedForecast[] => {
  const mappedForecast: MappedForecast[] = forecasts.map(
    (forecast: Forecast): MappedForecast => {
      const mappedForecast: MappedForecast = {}

      mappedForecast.apparentMaximumTemperature = applyCelsiusDegreesShort(
        forecast.app_max_temp
      )
      mappedForecast.apparentMinimumTemperature = applyCelsiusDegreesShort(
        forecast.app_min_temp
      )
      mappedForecast.timestampLocal = dateToProps(forecast.timestamp_local)
      mappedForecast.weatherIcon = forecast.weather.icon
      mappedForecast.relativeHumidity = applyPercentage(forecast.rh)

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
  const currentForecastDay: Forecast = forecastDay.data[0]

  mappedForecastDay.cityName = forecastDay.city_name
  mappedForecastDay.weatherDescription = currentForecastDay.weather.description
  mappedForecastDay.weatherIcon = currentForecastDay.weather.icon
  mappedForecastDay.timestampLocal = dateToProps(
    currentForecastDay.timestamp_local
  )
  mappedForecastDay.apparentMaximumTemperature = applyCelsiusDegreesLong(
    currentForecastDay.app_max_temp
  )
  mappedForecastDay.apparentMinimumTemperature = applyCelsiusDegreesLong(
    currentForecastDay.app_min_temp
  )
  mappedForecastDay.windSpeed = applyKmPerHour(
    toKmPerHour(currentForecastDay.wind_spd)
  )
  mappedForecastDay.dewPoint = applyCelsiusDegreesShort(
    currentForecastDay.dewpt
  )
  mappedForecastDay.relativeHumidity = applyPercentage(currentForecastDay.rh)
  mappedForecastDay.pressure = applyMillibars(currentForecastDay.pres)
  mappedForecastDay.visibility = applyKilometers(currentForecastDay.vis)
  mappedForecastDay.averageTemperature = applyCelsiusDegreesShort(
    currentForecastDay.temp
  )
  mappedForecastDay.dailyForecasts = dailyForecastsMapper(forecastDay.data)
  mappedForecastDay.sunrise = getFormattedDateFromTimezone(
    currentForecastDay.sunrise_ts,
    forecastDay.timezone
  )
  mappedForecastDay.sunset = getFormattedDateFromTimezone(
    currentForecastDay.sunset_ts,
    forecastDay.timezone
  )

  return mappedForecastDay
}
