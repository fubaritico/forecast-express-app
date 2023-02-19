import { Request } from 'express'
import { RequestOptions } from 'https'
import { ParamsDictionary } from 'express-serve-static-core'

export {}

declare global {
  /** Recommended params, otherwise params below can be used */
  type LocationParams = Partial<Coordinates>

  /** Other params that can be combined, if lat & lon are not used */
  type OtherParams = Partial<{
    /**
     * City name.<br>
     * ex:<br>
     * &city=Raleigh&country=US<br>
     * &city=Raleigh,NC<br>
     * &city=Raleigh,North+Carolina
     * */
    city: string
    /**
     * Optional when used with <i><b>city</b></i><br>
     * ex: <br>&city=Raleigh,North+Carolina
     *  */
    state: string
    /**
     * Observation by postal code<br>
     * ex:<br>
     * &postal_code=27601&country=US
     * */
    postal_code: string
    /**
     * Country abbreviation<br>
     * Optional when used with <i><b>city</b></i> or <i><b>postal_code</b></i><br>
     * ex:<br>
     *  &city=Raleigh&country=US<br>
     *  &postal_code=27601&country=US<br>
     *  */
    country: string
    /**
     * Observation by city id's<br>
     * ex:<br>
     *  &city_id=8953360
     *  */
    city_id: string
    /**
     * Observation by ICAO or station id<br>
     * ex:<br>
     *  &station=KRDU
     *  */
    station: string
    /**
     * List of city id's<br>
     * ex:<br>
     *  &cities=8953360,8953361,8953362
     *  */
    cities: string
    /**
     * Multiple observations by airport ICAO's, or station id's<br>
     * ex:<br>
     *  &stations=KRDU,KSEA,LEBB
     *  */
    stations: string
    /**
     * Multiple observations by lat/lon(s).<br>
     * Format: <i>"(lat1, lon1),(lat2, lon2), ..."</i><br>
     * ex:<br>
     *  &points=(35.88,-78.79),(47.45,-122.3),(43.3,-2.93)
     *  */
    points: string
    /**
     * If Request is a daily forecast request, days can be passed
     */
    days: number
    /**
     * If Request is an hourly forecast request, hours can be passed
     */
    hours: number
  }>

  /** Expected query string parameters, some parameters can be combined */
  type QueryParameters = LocationParams & OtherParams

  /**
   * Request with query property containing expected params
   * */
  type RequestWithExpectedParameters = Request<
    ParamsDictionary,
    object,
    object,
    QueryParameters
  >

  /** Object received from axios request?: front meant to be parsed as a query string */
  type ObjectToStringQuery = {
    [Key: string]: string | number | boolean | object | ObjectToStringQuery
  }

  type ApiConfig = RequestOptions & {
    /** Host name */
    hostname: string
    /** Path to the API request with query string parameters */
    path: string
    /** Method defaults to GET */
    method: string
    /** Any headers */
    headers: Record<string, unknown>
  }

  namespace WeatherbitAPI {
    /** Weather information for display */
    interface InlineModel {
      /**
       * Icon code for forecast image display
       * Weather icon code: 't01d', 't02d', etc
       * @see: https://www.weatherbit.io/api/codes
       * */
      /** Icon code for forecast image display */
      icon?: string
      /**
       * Weather Condition code
       * ex: 200 for 'Thunderstorm with light rain'
       * @see: https://www.weatherbit.io/api/codes
       * */
      code?: string
      /** Weather Condition description */
      description?: string
    }

    // "lat": 47.0816,
    //       "lon": 2.1988,

    /** List of current weather results */
    interface CurrentObs extends Coordinates {
      /**  Apparent/"Feels Like" temperature (default Celsius) */
      app_temp: number
      /** Air Quality Index [US - EPA standard 0 - +500] */
      aqi: number
      /** City name.<br>
       * &city=Raleigh&country=US<br>
       * &city=Raleigh,NC<br>
       * &city=Raleigh,North+Carolina
       * */
      city_name: string
      /** Cloud coverage (%) */
      clouds: number
      /** Country abbreviation */
      country_code: string
      /** [DEPRECATED] Current cycle hour (YYYY-MM-DD:HH) */
      datetime: string
      /** Dew point (default Celsius), in french: rosée */
      dewpt: number
      /** Diffuse horizontal solar irradiance (W/m^2) [Clear Sky] */
      dhi: number
      /** Direct normal solar irradiance (W/m^2) [Clear Sky] */
      dni: number
      /** Solar elevation angle (degrees) */
      elev_angle: number
      /** Global horizontal solar irradiance (W/m^2) [Clear Sky] */
      ghi: number
      /** Wind gust(rafale) speed (Default m/s) */
      gust: number
      /** [DEPRECATED] Solar hour angle (degrees) */
      h_angle: number
      /** Last observation time (YYYY-MM-DD HH:MM) */
      ob_time: string
      /** Part of the day (d = day / n = night) */
      pod: string
      /** Liquid equivalent precipitation rate (default mm/hr) */
      precip: 0
      /** Pressure (mb) */
      pres: number
      /** Relative humidity (%) */
      rh: number
      /** Sea level pressure (mb) */
      slp: number
      /** Snowfall (default mm/hr) */
      snow: 0
      /** Estimated Solar Radiation (W/m^2) */
      solar_rad: number
      /**
       * List of data sources used in response
       * ex: ["rtma", "CMVN7"]
       * */
      sources: string[]
      /** State abbreviation/code (US) */
      state_code: number
      /** [DEPRECATED] The nearest reporting station ID */
      station: string
      /** Sunrise time (HH:MM) */
      sunrise: string
      /** Sunset time (HH:MM) */
      sunset: string
      /** Temperature (default Celsius) */
      temp: number
      /** Local IANA Timezone */
      timezone: string
      /** Last observation time (Unix timestamp) */
      ts: number
      /** UV Index (0-11+) */
      uv: number
      /** Visibility (default KM) */
      vis: number
      /** Weather information for display */
      weather: InlineModel
      /** Abbreviated wind direction */
      wind_cdir: string
      /** Verbal wind direction */
      wind_cdir_full: string
      /** Wind direction (degrees) */
      wind_dir: number
      /** Wind speed (Default m/s) */
      wind_spd: number
    }

    interface CurrentObsGroup {
      /** Count of returned observations */
      count: number
      /** List of current weather results */
      data: CurrentObs[]
    }

    interface Forecast {
      /** Unix Timestamp */
      ts?: number
      /** Timestamp in local time */
      timestamp_local?: string
      /** Timestamp UTC  */
      timestamp_utc?: string
      /** Date in format "YYYY-MM-DD:HH". All datetime is in (UTC) */
      datetime?: string
      /** Accumulated snowfall since last forecast point - default (mm) */
      snow?: number
      /** Snow Depth - default (mm) */
      snow_depth?: number
      /** Accumulated precipitation since last forecast point - default (mm) */
      precip?: number
      /** Temperature (Average) - default (°C) */
      temp?: number
      /** Dewpoint (Average) - default (°C) */
      dewpt?: number
      /** Maximum daily Temperature - default (°C) */
      max_temp?: number
      /** Minimum daily Temperature - default (°C) */
      min_temp?: number
      /** Apparent Maximum daily Temperature - default (°C) */
      app_max_temp?: number
      /** Apparent Minimum daily Temperature - default (°C) */
      app_min_temp?: number
      /** Relative Humidity as a percentage (%) */
      rh?: number
      /** Cloud cover as a percentage (%) */
      clouds?: number
      /** Weather information for display */
      weather?: InlineModel
      /** Mean Sea level pressure (mb) */
      slp?: number
      /** Pressure (mb) */
      pres?: number
      /** UV Index */
      uv?: number
      /** [Deprecated] Max direct component of solar insolation (W/m^2) */
      max_dhi?: number
      /** Average Visibility default (KM) */
      vis?: number
      /** Chance of Precipitation as a percentage (%) */
      pop?: number
      /** Moon phase */
      moon_phase?: number
      /** Sunrise unix timestamp */
      sunrise_ts?: number
      /** Sunset unix timestamp */
      sunset_ts?: number
      /** Moonrise unix timestamp */
      moonrise_ts?: number
      /** Moonset unix timestamp */
      moonset_ts?: number
      /** Part of the day (d = day, n = night) */
      pod?: string
      /** Wind Speed (default m/s) */
      wind_spd?: number
      /** Wind direction */
      wind_dir?: number
      /** Cardinal wind direction */
      wind_cdir?: string
      /** Cardinal wind direction (text) */
      wind_cdir_full?: string
    }

    interface ForecastInformation {
      /** City Name */
      city_name?: string
      /** State Abbreviation */
      state_code?: string
      /** Country Abbreviation */
      country_code?: string
      /** Latitude */
      lat?: string
      /** Longitude */
      lon?: string
      /** Local IANA time zone */
      timezone?: string
    }

    interface ForecastDay extends ForecastInformation {
      /** Forecasts for today & next days (upto 16 days) */
      data?: Forecast[]
    }

    interface ForecastHour {
      /** Unix Timestamp */
      ts?: number
      /** Timestamp in local time */
      timestamp_local?: string
      /** Timestamp UTC */
      timestamp_utc?: string
      /** Date in format "YYYY-MM-DD:HH". All datetime is in (UTC) */
      datetime?: string
      /** Accumulated snowfall since last forecast point - Default (mm) */
      snow?: number
      /** Snow depth - Default (mm) */
      snow_depth?: number
      /** Accumulated precipitation since last forecast point. Default (mm) */
      precip?: number
      /** Temperature - Default (°C) */
      temp?: number
      /** Dewpoint - Default (°C) */
      dewpt?: number
      /** Apparent Temperature - Default (°C) */
      app_temp?: number
      /** Relative Humidity as a percentage (%) */
      rh?: number
      /** Cloud cover as a percentage (%) */
      clouds?: number
      /**  */
      weather?: InlineModel
      /** Mean Sea level pressure (mb) */
      slp?: number
      /** Pressure (mb) */
      pres?: number
      /** UV Index */
      uv?: number
      /** Estimated solar radiation (W/m^2) */
      solar_rad?: number
      /** Global horizontal solar irradiance (W/m^2) */
      ghi?: number
      /** Diffuse normal solar irradiance (W/m^2) */
      dhi?: number
      /** Direct normal solar irradiance (W/m^2) */
      dni?: number
      /** Visibility - Default (KM) */
      vis?: number
      /** Part of day (d = day, n = night) */
      pod?: string
      /** Chance of Precipitation as a percentage (%) */
      pop?: number
      /** Wind Speed - Default (m/s) */
      wind_spd?: number
      /** Wind Gust Speed - Default (m/s) */
      wind_gust_spd?: number
      /** Wind direction */
      wind_dir?: number
      /** Cardinal wind direction */
      wind_cdir?: string
      /** Cardinal wind direction (text) */
      wind_cdir_full?: string
    }

    interface ForecastHourly extends ForecastInformation {
      /** Forecasts for now & next hours (upto 250 hours) */
      data?: ForecastHour[]
    }
  }
}
