import toQueryString from "@Utils/queryString";

export const getApiRequestConfig = (coords: Coordinates) => {
    return {
        hostname: process.env.APP_WEATHER_API_HOST,
        path: `/forecast/3hourly${toQueryString(coords)}`,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.APP_WEATHER_API_KEY,
            'X-RapidAPI-Host': process.env.APP_WEATHER_API_HOST,
        },
    };
}

