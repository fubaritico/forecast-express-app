type ForecastHour = WeatherbitAPI.ForecastHour

export const hourlyForecastsMapper = (
  forecastHours: ForecastHour[]
): MappedHourlyForecast[] => {
  return forecastHours.map((forecastHour) => {
    return {
      temp: forecastHour.temp,
      timestamp_local: forecastHour.timestamp_local,
      clouds: forecastHour.clouds,
    }
  })
}
