type Observations = WeatherbitAPI.Observations
type Observation = WeatherbitAPI.Observation

const currentObservationMapper = (
  currentObservation: Observation
): MappedObservation => {
  const mappedObservation: MappedObservation = {}

  mappedObservation.description = currentObservation.weather.description
  mappedObservation.code = currentObservation.weather.code
  mappedObservation.icon = currentObservation.weather.icon
  mappedObservation.city_name = currentObservation.city_name
  mappedObservation.sunrise = currentObservation.sunrise
  mappedObservation.sunset = currentObservation.sunset
  mappedObservation.app_temp = currentObservation.app_temp
  mappedObservation.coordinates = {
    lat: currentObservation.lat,
    lon: currentObservation.lon,
  }
  return mappedObservation
}

export const currentDefaultObservationsMapper = (
  observationResults: Observations[]
): MappedObservation[] => {
  return observationResults
    .map((observationResult: Observations) =>
      observationResult.data.map((currentObservation: Observation) => {
        return currentObservationMapper(currentObservation)
      })
    )
    .flat(1)
}
