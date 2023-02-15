import toQueryString from '@Utils/queryString'

export const getApiRequestConfig = (
  parameters: QueryParameters,
  path = '/current'
): ApiConfig => {
  return {
    hostname: process.env.APP_RAPID_API_WEATHER_API_HOST,
    path: `${path}${toQueryString(parameters)}`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.APP_RAPID_API_WEATHER_API_KEY,
      'X-RapidAPI-Host': process.env.APP_RAPID_API_WEATHER_API_HOST,
    },
  }
}

export const getApiDailyForecastsRequestConfig = (
  parameters: QueryParameters,
  path = '/forecast/daily'
): ApiConfig => {
  return {
    hostname: process.env.APP_RAPID_API_WEATHER_API_HOST,
    path: `${path}${toQueryString(parameters)}&key=${
      process.env.APP_WEATHER_API_KEY
    }`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.APP_RAPID_API_WEATHER_API_KEY,
      'X-RapidAPI-Host': process.env.APP_RAPID_API_WEATHER_API_HOST,
    },
  }
}

export const getApiHourlyForecastsRequestConfig = (
  parameters: QueryParameters,
  path = '/forecast/hourly'
): ApiConfig => {
  return {
    hostname: process.env.APP_RAPID_API_WEATHER_API_HOST,
    path: `${path}${toQueryString(parameters)}&key=${
      process.env.APP_WEATHER_API_KEY
    }`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.APP_RAPID_API_WEATHER_API_KEY,
      'X-RapidAPI-Host': process.env.APP_RAPID_API_WEATHER_API_HOST,
    },
  }
}
