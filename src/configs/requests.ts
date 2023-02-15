import toQueryString from '@Utils/queryString'

export const getApiRequestConfig = (
  coords: QueryParameters,
  path = '/forecast/hourly'
) => {
  return {
    hostname: process.env.APP_WEATHER_API_HOST,
    path: `${path}${toQueryString(coords)}`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.APP_RAPID_API_WEATHER_API_KEY,
      'X-RapidAPI-Host': process.env.APP_WEATHER_API_HOST,
    },
  }
}
