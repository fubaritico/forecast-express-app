import https from 'https'
import { getApiRequestConfig } from '@Configs/requests'

/** Arbitrary selected locations */
const defaultCoordsList: Coordinates[] = [
  { lat: 35.5, lon: 78.5 }, // Some Place
  { lat: 50.63022092883518, lon: 3.0597929062754594 }, // Lille
  { lat: 40.51836, lon: -3.825185 }, // Madrid
  { lat: 41.912541, lon: 12.508524 }, // Rome
  { lat: 51.506646, lon: -0.103871 }, // London
  { lat: 40.724997, lon: -73.990566 }, // New York
  { lat: 35.689249, lon: 139.76238 }, // Tokyo
  { lat: -34.628235, lon: -58.447033 }, // Buenos Aires
]

/**
 * Will request any API route with latitude and longitude by default
 *
 * @returns {Promise<WeatherAPI.Observations>}
 */
export const getWeatherService = (
  params: QueryParameters,
  apiPath = '/current'
): Promise<WeatherAPI.Observations> => {
  return new Promise((resolve, reject) => {
    try {
      https
        .request(getApiRequestConfig(params, apiPath), (response) => {
          let data = ''

          response.on('data', (chunk) => {
            data += chunk
          })

          response.on('end', () => {
            resolve(JSON.parse(data))
          })
        })
        .on('error', (err) => {
          console.error(`[ERROR] getWeatherService @ ${apiPath} - err: `, err)
          reject(err)
        })
        .end()
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Will return 10 selected weather observations
 */
export const getDefaultObservationsService = () => {
  return Promise.all<Promise<WeatherAPI.Observations>[]>(
    defaultCoordsList.map((coords) => getWeatherService(coords))
  )
}
