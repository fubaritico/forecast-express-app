import https from 'https'
import {
  getApiDailyForecastsRequestConfig,
  getApiHourlyForecastsRequestConfig,
  getApiRequestConfig,
} from '@Configs/requests'
import { setCoordinates } from '@Utils/geocoder'

/** Arbitrary selected locations */
const defaultCoordsList: QueryParameters[] = [
  { lat: '35.5', lon: '78.5', cityName: '' }, // Some Place
  { lat: '50.63022092883518', lon: '3.0597929062754594', cityName: '' }, // Lille
  { lat: '40.51836', lon: '-3.825185', cityName: '' }, // Madrid
  { lat: '41.912541', lon: '12.508524', cityName: '' }, // Rome
  { lat: '51.506646', lon: '-0.103871', cityName: '' }, // London
  { lat: '40.724997', lon: '-73.990566', cityName: '' }, // New York
  { lat: '35.689249', lon: '139.76238', cityName: '' }, // Tokyo
  { lat: '-34.628235', lon: '-58.447033', cityName: '' }, // Buenos Aires
]

/**
 * Will request any API route with latitude and longitude by default
 *
 * @returns {Promise<WeatherbitAPI.CurrentObsGroup>}
 */
export const getWeatherService = <T>(apiConfig: ApiConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      https
        .request(apiConfig, (response) => {
          let data = ''

          response.on('data', (chunk) => {
            data += chunk
          })

          response.on('end', () => {
            resolve(JSON.parse(data))
          })
        })
        .on('error', (err) => {
          console.error(
            `[ERROR] getWeatherService @ ${apiConfig.path} - err: `,
            err
          )
          reject(err)
        })
        .end()
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Will return selected weather observations
 */
export const getDefaultObservationsService = async () => {
  return Promise.all<Promise<WeatherbitAPI.CurrentObsGroup>[]>(
    defaultCoordsList.map((coords) =>
      getWeatherService<WeatherbitAPI.CurrentObsGroup>(
        getApiRequestConfig(coords, '/current', '/v2.0') // defaults to '/current' path
      )
    )
  )
}

/**
 * Will return weather observation of a given location (lat & lon)
 */
export const getCurrentObservationService = async (
  parameters: QueryParameters
) => {
  const coordinates = await setCoordinates(parameters)
  return getWeatherService<WeatherbitAPI.CurrentObsGroup>(
    getApiRequestConfig({ ...coordinates }, '/current', '/v2.0')
  )
}

/**
 * Will return next 7 days forecasts for a given place defined by its latitude and longitude
 */
export const getWeeklyForecastsService = async (
  parameters: QueryParameters
) => {
  const coordinates = await setCoordinates(parameters)
  return getWeatherService<WeatherbitAPI.ForecastDay>(
    getApiDailyForecastsRequestConfig(
      { ...coordinates, days: 8 }, // the forecast includes the current day
      '/forecast/daily'
    )
  )
}

/**
 * Will return next 6 hours forecasts of the current day for a given place defined by its latitude and longitude
 */
export const getHourlyForecastsService = async (
  parameters: QueryParameters
) => {
  const coordinates = await setCoordinates(parameters)
  return getWeatherService<WeatherbitAPI.ForecastHourly>(
    getApiHourlyForecastsRequestConfig(
      { ...coordinates, hours: 24 },
      '/forecast/hourly'
    )
  )
}
