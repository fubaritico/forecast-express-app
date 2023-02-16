import toQueryString from '@Utils/queryString'

export const getApiRequestConfig = (
  parameters: QueryParameters,
  path = '/current',
  prefix?: string,
  isRapidApi = false
): ApiConfig => {
  return {
    hostname: isRapidApi
      ? process.env.APP_RAPID_API_WEATHER_API_HOST
      : process.env.APP_WEATHER_API_HOST,
    path: `${(prefix && !isRapidApi) ?? prefix}${path}${toQueryString(
      parameters
    )}${!isRapidApi ?? `&key=${process.env.APP_WEATHER_API_KEY}`}`,
    method: 'GET',
    headers: {
      ...(isRapidApi
        ? {
            'X-RapidAPI-Key': process.env.APP_RAPID_API_WEATHER_API_KEY,
            'X-RapidAPI-Host': process.env.APP_RAPID_API_WEATHER_API_HOST,
          }
        : undefined),
    },
  }
}

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
