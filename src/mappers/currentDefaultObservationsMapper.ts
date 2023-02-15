type Observations = WeatherAPI.Observations
type Observation = WeatherAPI.Observation

const currentObservationMapper = (
  currentObservation: Observation
): MappedForecast => {
  const mappedForecast: MappedForecast = {}

  mappedForecast.description = currentObservation.weather.description
  mappedForecast.code = currentObservation.weather.code
  mappedForecast.icon = currentObservation.weather.icon
  mappedForecast.city_name = currentObservation.city_name
  mappedForecast.sunrise = currentObservation.sunrise
  mappedForecast.sunset = currentObservation.sunset
  mappedForecast.app_temp = currentObservation.app_temp
  mappedForecast.coordinates = {
    lat: currentObservation.lat,
    lon: currentObservation.lon,
  }
  return mappedForecast
}

export const currentDefaultObservationsMapper = (
  observationResults: Observations[]
): MappedForecast[] => {
  return observationResults
    .map((observationResult: Observations) =>
      observationResult.data.map((currentObservation: Observation) => {
        return currentObservationMapper(currentObservation)
      })
    )
    .flat(1)
}
