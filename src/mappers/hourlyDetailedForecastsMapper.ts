import { applyDegreesShort, applyPercentage } from '@Utils/units'
import { timestampLocalToProps, round } from '@Utils/convert'

type ForecastHour = WeatherbitAPI.ForecastHour

export const hourlyDetailedForecastsMapper = (
  forecastHours: ForecastHour[]
): MappedHourlyForecast => ({
  temperatures: forecastHours
    .map((forecastHour, index): ChartData => {
      return {
        chartValue: {
          value: forecastHour.temp,
          display: applyDegreesShort(round(forecastHour.temp)),
        },
        timestampLocal: timestampLocalToProps(
          forecastHour.timestamp_local,
          index
        ),
      }
    })
    .filter((_, i) => i < 7),
  chancesOfRain: forecastHours
    .map((forecastHour, index): ChartData => {
      return {
        chartValue: {
          value: forecastHour.pop,
          display: applyPercentage(forecastHour.pop),
        },
        timestampLocal: timestampLocalToProps(
          forecastHour.timestamp_local,
          index
        ),
      }
    })
    .filter((_, i) => i % 3 === 0)
    .filter((_, i) => i < 7),
})
