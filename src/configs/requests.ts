import toQueryString from '@Utils/queryString'
import dotenv from 'dotenv'

const envConfig = dotenv.config()
const {
  APP_USE_RAPID_API,
  APP_WEATHER_API_KEY,
  APP_WEATHER_API_HOST,
  APP_RAPID_API_WEATHER_API_KEY,
  APP_RAPID_API_WEATHER_API_HOST,
} = envConfig.parsed

const isUsingRapidApi = APP_USE_RAPID_API === 'true'

export const getApiRequestConfig = (
  parameters: QueryParameters,
  path = '/current',
  prefix?: string
): ApiConfig => ({
  hostname: isUsingRapidApi
    ? APP_RAPID_API_WEATHER_API_HOST
    : APP_WEATHER_API_HOST,
  path: `${prefix && !isUsingRapidApi ? prefix : ''}${path}${toQueryString(
    parameters
  )}${!isUsingRapidApi ? `&key=${APP_WEATHER_API_KEY}` : ''}`,
  method: 'GET',
  headers: {
    ...(isUsingRapidApi
      ? {
          'X-RapidAPI-Key': APP_RAPID_API_WEATHER_API_KEY,
          'X-RapidAPI-Host': APP_RAPID_API_WEATHER_API_HOST,
        }
      : undefined),
  },
})

export const getApiDailyForecastsRequestConfig = (
  parameters: QueryParameters,
  path = '/forecast/daily'
): ApiConfig => {
  return getApiRequestConfig(parameters, path, '/v2.0')
}

export const getApiHourlyForecastsRequestConfig = (
  parameters: QueryParameters,
  path = '/forecast/hourly'
): ApiConfig => {
  return getApiRequestConfig(parameters, path, '/v2.0')
}
