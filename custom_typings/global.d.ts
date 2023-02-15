import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';

export {}

// TODO: distinguish forecast(future) & observation(present)

declare global {
    /** Latitude & longitude (Degrees) */
    type Coordinates = {
        /** Latitude (Degrees) */
        lat: number
        /** Longitude (Degrees) */
        lon: number
    }

    /** Recommended params, otherwise params below can be used */
    type LocationParams = Partial<Coordinates>

    /** Other params that can be combined, if lat & lon are not used */
    type OtherParams = Partial<{
        /**
         * City name.
         * ex:
         * &city=Raleigh&country=US
         * &city=Raleigh,NC
         * &city=Raleigh,North+Carolina
         * */
        city: string,
        /**
         * (US) Optional when used with <i><b>city</b></i>
         * ex: &city=Raleigh,North+Carolina
         *  */
        state: string,
        /**
         * Observation by postal code
         * &postal_code=27601&country=US
         * */
        postal_code: string,
        /**
         * Country abbreviation
         * Optional when used with <i><b>city</b></i> or <i><b>postal_code</b></i>
         * ex:
         *  &city=Raleigh&country=US
         *  &postal_code=27601&country=US
         *  */
        country: string,
        /**
         * Observation by city id's
         * ex:
         *  &city_id=8953360
         *  */
        city_id: string,
        /**
         * Observation by ICAO or station id
         * ex:
         *  &station=KRDU
         *  */
        station: string,
        /**
         * List of city id's
         * ex:
         *  &cities=8953360,8953361,8953362
         *  */
        cities: string,
        /**
         * Multiple observations by airport ICAO's, or station id's
         * ex:
         *  &stations=KRDU,KSEA,LEBB
         *  */
        stations: string,
        /**
         * Multiple observations by lat/lon(s). Format: <i>"(lat1, lon1),(lat2, lon2), ..."</i>
         * ex:
         *  &points=(35.88,-78.79),(47.45,-122.3),(43.3,-2.93)
         *  */
        points: string,

    }>

    /** Expected query string parameters, some parameters can be combined */
    type QueryParameters = LocationParams & OtherParams

    /**
     * Request with query property containing expected params
     * */
    type RequestWithExpectedParameters = Request<ParamsDictionary, object, object, QueryParameters>

    /** Object received from axios request (front) meant to be parsed as a query string */
    type ObjectToStringQuery = {
        [Key: string]: string | number | boolean | object | ObjectToStringQuery
    }

    type MappedForecast = Partial<{
        /** City name.
         * &city=Raleigh&country=US
         * &city=Raleigh,NC
         * &city=Raleigh,North+Carolina
         * */
        city_name: string,
        /**  Apparent/"Feels Like" temperature (default Celsius) */
        app_temp: number,
        /** Latitude & longitude (Degrees) */
        coordinates: Coordinates,
        /** Text weather description */
        description: string,
        /**
         * Weather code
         * ex: 200 for 'Thunderstorm with light rain'
         * @see: https://www.weatherbit.io/api/codes
         * */
        code: number,
        /**
         * Weather icon code
         * ex: 't01d', 't02d', etc
         * @see: https://www.weatherbit.io/api/codes
         * */
        icon: string,
        /** Sunrise time (HH:MM) */
        sunrise: string,
        /** Sunset time (HH:MM) */
        sunset: string,

    }>

    namespace WeatherAPI {
        /** List of current weather results */
        interface Observation extends Coordinates {
            /**  Apparent/"Feels Like" temperature (default Celsius) */
            app_temp: number,
            /** Air Quality Index [US - EPA standard 0 - +500] */
            aqi: number,
            /** City name.
             * &city=Raleigh&country=US
             * &city=Raleigh,NC
             * &city=Raleigh,North+Carolina
             * */
            city_name: string,
            /** Cloud coverage (%) */
            clouds: number,
            /** Country abbreviation */
            country_code: string,
            /** [DEPRECATED] Current cycle hour (YYYY-MM-DD:HH) */
            datetime: string,
            /** Dew point (default Celsius), in french: rosée */
            dewpt: number,
            /** Diffuse horizontal solar irradiance (W/m^2) [Clear Sky] */
            dhi: number,
            /** Direct normal solar irradiance (W/m^2) [Clear Sky] */
            dni: number,
            /** Solar elevation angle (degrees) */
            elev_angle: number,
            /** Global horizontal solar irradiance (W/m^2) [Clear Sky] */
            ghi: number,
            /** Wind gust(rafale) speed (Default m/s) */
            gust: number,
            /** [DEPRECATED] Solar hour angle (degrees) */
            h_angle: number,
            /** Last observation time (YYYY-MM-DD HH:MM) */
            ob_time: string,
            /** Part of the day (d = day / n = night) */
            pod: string,
            /** Liquid equivalent precipitation rate (default mm/hr) */
            precip: 0,
            /** Pressure (mb) */
            pres: number,
            /** Relative humidity (%) */
            rh: number,
            /** Sea level pressure (mb) */
            slp: number,
            /** Snowfall (default mm/hr) */
            snow: 0,
            /** Estimated Solar Radiation (W/m^2) */
            solar_rad: number,
            /**
             * List of data sources used in response
             * ex: ["rtma", "CMVN7"]
             * */
            sources: string[],
            /** State abbreviation/code (US) */
            state_code: number,
            /** [DEPRECATED] The nearest reporting station ID */
            station: string,
            /** Sunrise time (HH:MM) */
            sunrise: string,
            /** Sunset time (HH:MM) */
            sunset: string,
            /** Temperature (default Celsius) */
            temp: number,
            /** Local IANA Timezone */
            timezone: string,
            /** Last observation time (Unix timestamp) */
            ts: number,
            /** UV Index (0-11+) */
            uv: number,
            /** Visibility (default KM) */
            vis: number,
            /** Weather information for display */
            weather: {
                /** Text weather description */
                description: string,
                /**
                 * Weather code
                 * ex: 200 for 'Thunderstorm with light rain'
                 * @see: https://www.weatherbit.io/api/codes
                 * */
                code: number,
                /**
                 * Weather icon code: 't01d', 't02d', etc
                 * @see: https://www.weatherbit.io/api/codes
                 * */
                icon: string
            },
            /** Abbreviated wind direction */
            wind_cdir: string,
            /** Verbal wind direction */
            wind_cdir_full: string,
            /** Wind direction (degrees) */
            wind_dir: number,
            /** Wind speed (Default m/s) */
            wind_spd: number
        }

        interface Observations {
            /** Count of returned observations */
            count: number,
            /** List of current weather results */
            data: Observation[]
        }
    }
}
