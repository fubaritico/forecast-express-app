import { applyCelsiusDegreesShort, applyPercentage } from '@Utils/units'
import { timestampLocalToProps, round } from '@Utils/convert'

type ForecastHour = WeatherbitAPI.ForecastHour

export const hourlyDetailedForecastsMapper = (
  forecastHours: ForecastHour[]
): MappedHourlyForecast => ({
  temperatures: forecastHours
    .map((forecastHour): TemperatureForecast => {
      return {
        temperature: {
          value: forecastHour.temp,
          display: applyCelsiusDegreesShort(round(forecastHour.temp)),
        },
        timestampLocal: timestampLocalToProps(forecastHour.timestamp_local),
      }
    })
    .filter((_, i) => i < 7),
  chancesOfRain: forecastHours
    .map((forecastHour): ChancesOfRainForecast => {
      return {
        chancesOfRain: {
          value: forecastHour.pop,
          display: applyPercentage(forecastHour.pop),
        },
        timestampLocal: timestampLocalToProps(forecastHour.timestamp_local),
      }
    })
    .filter((_, i) => i % 3 === 0),
})
