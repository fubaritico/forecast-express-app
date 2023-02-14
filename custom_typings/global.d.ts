import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';

export {}

declare global {
    type Coordinates = {
        lat: number
        lon: number
    }

    type RequestWithCoordinates = Request<ParamsDictionary, object, object, Coordinates>

    type ObjectToStringQuery = {
        [Key: string]: string | number | boolean | object | ObjectToStringQuery
    }

    type MappedForecast = Partial<{
        city_name: string,
        app_temp: number,
        coordinates: Coordinates
        description: string,
        code: number,
        icon: string
        sunrise: string,
        sunset: string,

    }>

    namespace WeatherAPI {
        interface ForecastData {
            app_temp: number,
            aqi: number,
            city_name: string,
            clouds: number,
            country_code: string,
            datetime: string,
            dewpt: number,
            dhi: number,
            dni: number,
            elev_angle: number,
            ghi: number,
            gust: number,
            h_angle: number,
            lat: number,
            lon: number,
            ob_time: string,
            pod: string,
            precip: 0,
            pres: number,
            rh: number,
            slp: number,
            snow: 0,
            solar_rad: number,
            sources: string[],
            state_code: number,
            station: string,
            sunrise: string,
            sunset: string,
            temp: number,
            timezone: string,
            ts: number,
            uv: number,
            vis: number,
            weather: {
                description: string,
                code: number,
                icon: string
            },
            wind_cdir: string,
            wind_cdir_full: string,
            wind_dir: number,
            wind_spd: number
        }

        interface CurrentForecast {
            count: number,
            data: ForecastData[]
        }
    }
}
