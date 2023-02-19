import { applyCelsiusDegreesShort } from '@Utils/units'
import { timeToProps } from '@Utils/convert'

type Observations = WeatherbitAPI.CurrentObsGroup
type Observation = WeatherbitAPI.CurrentObs

const currentObservationMapper = (
  currentObservation: Observation
): MappedObservation => {
  const mappedObservation: MappedObservation = {}

  mappedObservation.description = currentObservation.weather.description
  mappedObservation.icon = currentObservation.weather.icon
  mappedObservation.city_name = currentObservation.city_name
  mappedObservation.sunrise = timeToProps(currentObservation.sunrise)
  mappedObservation.sunset = timeToProps(currentObservation.sunset)
  mappedObservation.app_temp = applyCelsiusDegreesShort(
    currentObservation.app_temp
  )
  mappedObservation.coordinates = {
    lat: currentObservation.lat,
    lon: currentObservation.lon,
  }

  return mappedObservation
}

export const currentDefaultObservationsMapper = (
  observationResults: Observations[]
): MappedObservation[] => {
  console.log(
    'currentDefaultObservationsMapper - observationResults: ',
    observationResults
  )
  return observationResults
    .map((observationResult: Observations) =>
      observationResult.data.map((currentObservation: Observation) => {
        return currentObservationMapper(currentObservation)
      })
    )
    .flat(1)
}
