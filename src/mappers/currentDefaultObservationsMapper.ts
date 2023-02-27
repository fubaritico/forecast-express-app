import { applyDegreesShort } from '@Utils/units'
import { dateToWeekDay, round, timeToProps } from '@Utils/convert'

type Observations = WeatherbitAPI.CurrentObsGroup
type Observation = WeatherbitAPI.CurrentObs

export const currentObservationMapper = (
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
  mappedObservation.temperature = applyDegreesShort(
    round(currentObservation.app_temp)
  )
  mappedObservation.dateLocal = dateToWeekDay(currentObservation.ts)

  console.log(mappedObservation)
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
