import NodeGeocoder, { Options } from 'node-geocoder'
import dotenv from 'dotenv'
dotenv.config()

const options: Options = {
  provider: 'google',
  // for Mapquest, OpenCage, Google Premier
  apiKey: process.env.APP_GOOGLE_MAP_API_KEY,
  // 'gpx', 'string', ...
  formatter: null,
}

const geocoder = NodeGeocoder(options)

/**
 *
 * output :
 * [
 *   {
 *     latitude: 48.8698679,
 *     longitude: 2.3072976,
 *     country: 'France',
 *     countryCode: 'FR',
 *     city: 'Paris',
 *     zipcode: '75008',
 *     streetName: 'Champs-Élysées',
 *     streetNumber: '29',
 *     administrativeLevels: {
 *       level1long: 'Île-de-France',
 *       level1short: 'IDF',
 *       level2long: 'Paris',
 *       level2short: '75',
 *     },
 *     provider: 'google',
 *   },
 * ]
 */
export const setCoordinates = async (
  parameters: QueryParameters
): Promise<QueryParameters> => {
  if (typeof parameters.lat !== 'undefined') {
    return parameters
  }
  const locationParams = parameters.cityName.split('-')

  const res = await geocoder.geocode({
    country: locationParams[1],
    address: locationParams[0],
  })

  return { lat: res[0].latitude.toString(), lon: res[0].longitude.toString() }
}
