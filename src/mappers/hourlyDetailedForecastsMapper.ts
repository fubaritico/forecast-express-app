type ForecastHour = WeatherbitAPI.ForecastHour

export const hourlyDetailedForecastsMapper = (
  forecastHours: ForecastHour[]
): MappedHourlyForecast => ({
  temperatures: forecastHours
    .map((forecastHour) => {
      return {
        temp: forecastHour.temp,
        timestamp_local: forecastHour.timestamp_local,
      }
    })
    .filter((_, i) => i < 7),
  chancesOfRain: forecastHours
    .map((forecastHour) => {
      return {
        clouds: forecastHour.clouds,
        timestamp_local: forecastHour.timestamp_local,
      }
    })
    .filter((_, i) => i % 3 === 0),
})
