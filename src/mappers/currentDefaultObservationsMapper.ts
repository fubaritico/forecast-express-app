import { applyCelsiusDegreesShort } from '@Utils/units'
import { timeToProps } from '@Utils/convert'

type Observations = WeatherbitAPI.CurrentObsGroup
type Observation = WeatherbitAPI.CurrentObs

const currentObservationMapper = (
  currentObservation: Observation
): MappedObservation => {
  const mappedObservation: MappedObservation = {}

  mappedObservation.cityName = currentObservation.city_name
  mappedObservation.weatherDescription = currentObservation.weather.description
  mappedObservation.weatherIcon = currentObservation.weather.icon
  mappedObservation.sunrise = timeToProps(
    currentObservation.sunrise,
    currentObservation.timezone
  )
  mappedObservation.sunset = timeToProps(
    currentObservation.sunset,
    currentObservation.timezone
  )
  mappedObservation.temperature = applyCelsiusDegreesShort(
    currentObservation.app_temp
  )
  mappedObservation.coordinates = {
    lat: currentObservation.lat.toString(),
    lon: currentObservation.lon.toString(),
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
