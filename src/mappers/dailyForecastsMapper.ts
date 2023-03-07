import { dateToWeekDay, round, toKmPerHour } from '@Utils/convert'
import {
  applyDegreesShort,
  applyKilometers,
  applyKmPerHour,
  applyPressureUnits,
  applyPercentage,
} from '@Utils/units'
import { generateID } from '@Utils/miscellanous'

type ForecastDay = WeatherbitAPI.ForecastDay
type Forecast = WeatherbitAPI.Forecast

export const dailyForecastsMapper = (
  forecasts: Forecast[]
): MappedForecast[] => {
  const mappedForecast: MappedForecast[] = forecasts.map(
    (forecast: Forecast): MappedForecast => {
      const mappedForecast: MappedForecast = {
        id: generateID().toString(),
      }

      mappedForecast.apparentMaximumTemperature = applyDegreesShort(
        round(forecast.app_max_temp)
      )
      mappedForecast.apparentMinimumTemperature = applyDegreesShort(
        round(forecast.app_min_temp)
      )
      mappedForecast.timestampLocal = dateToWeekDay(forecast.ts)
      mappedForecast.weatherIcon = forecast.weather.icon
      mappedForecast.chancesOfRain = applyPercentage(forecast.pop)

      return mappedForecast
    }
  )

  if (mappedForecast.length > 1) mappedForecast.shift()

  return mappedForecast
}
export const forecastDayMapper = (
  forecastDay: ForecastDay,
  mappedCurrentObservation: MappedObservation & DetailedObservationData
): MappedForecastDay => {
  const mappedForecastDay: MappedForecastDay = {
    currentObservation: mappedCurrentObservation,
    dailyForecasts: [],
    hourlyForecasts: {
      temperatures: [],
      chancesOfRain: [],
    },
  }
  const currentForecastDay: Forecast = forecastDay.data[0]

  mappedForecastDay.currentObservation.apparentMaximumTemperature =
    applyDegreesShort(round(currentForecastDay.app_max_temp))
  mappedForecastDay.currentObservation.apparentMinimumTemperature =
    applyDegreesShort(round(currentForecastDay.app_min_temp))
  mappedForecastDay.currentObservation.windSpeed = applyKmPerHour(
    toKmPerHour(currentForecastDay.wind_spd)
  )
  mappedForecastDay.currentObservation.dewPoint = applyDegreesShort(
    round(currentForecastDay.dewpt)
  )
  mappedForecastDay.currentObservation.relativeHumidity = applyPercentage(
    currentForecastDay.rh
  )
  mappedForecastDay.currentObservation.pressure = applyPressureUnits(
    currentForecastDay.pres
  )
  mappedForecastDay.currentObservation.visibility = applyKilometers(
    currentForecastDay.vis
  )
  mappedForecastDay.currentObservation.feelsLike = applyDegreesShort(
    round(currentForecastDay.temp)
  )
  mappedForecastDay.dailyForecasts = dailyForecastsMapper(forecastDay.data)

  return mappedForecastDay
}
