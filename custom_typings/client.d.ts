export {}

declare global {
  /** Latitude & longitude (Degrees) */
  type Coordinates = {
    /** Latitude (Degrees) */
    lat: string
    /** Longitude (Degrees) */
    lon: string
  }

  /** Current weather of a place */
  type MappedObservation = Partial<{
    /**
     * City name
     * &city=Raleigh&country=US
     * &city=Raleigh,NC
     * &city=Raleigh,North+Carolina
     * */
    city_name: string
    /**  Apparent/"Feels Like" temperature (default Celsius) */
    app_temp: number
    /** Latitude & longitude (Degrees) */
    coordinates: Coordinates
    /** Text weather description */
    description: string
    /**
     * Weather code
     * ex: 200 for 'Thunderstorm with light rain'
     * @see: https://www.weatherbit.io/api/codes
     * */
    code: string
    /**
     * Weather icon code
     * ex: 't01d', 't02d', etc
     * @see: https://www.weatherbit.io/api/codes
     * */
    icon: string
    /** Sunrise time (HH:MM) */
    sunrise: string
    /** Sunset time (HH:MM) */
    sunset: string
  }>

  /** List of current observations */
  type GetCurrentDefaultObservationsResponse = MappedObservation[]

  /** Forecast information displayed in detailed view for each incomming day */
  type MappedForecast = {
    /** Timestamp in local time */
    timestamp_local?: string
    /** Date in format "YYYY-MM-DD:HH". All datetime is in (UTC) */
    datetime?: string
    /** Apparent Maximum daily Temperature - default (C) */
    app_max_temp?: number
    /** Apparent Minimum daily Temperature - default (C) */
    app_min_temp?: number
    /**
     * Icon code for forecast image display
     * Weather icon code: 't01d', 't02d', etc
     * @see: https://www.weatherbit.io/api/codes
     * */
    icon?: string
    /**
     * Weather Condition code
     * ex: 200 for 'Thunderstorm with light rain'
     * @see: https://www.weatherbit.io/api/codes
     * */
    code?: string
    /** Part of the day (d = day, n = night) */
    pod?: string
  }

  /** List of temperature forecast every next hours (7) - Default (C) */
  type TemperatureForecast = {
    /** Temperature - Default (C) */
    temp?: number
    /** Timestamp in local time */
    timestamp_local?: string
  }

  /** List of chances of rain forecast every 3 hours (7) - Default (C) */
  type RainChancesForecast = {
    /** Temperature - Default (C) */
    temp?: number
    /** Cloud cover as a percentage (%) */
    clouds?: number
  }

  type MappedHourlyForecast = {
    /** List of temperature forecast every next hours (7) - Default (C) */
    temperatures: TemperatureForecast[]
    /** List of chances of rain forecast every 3 hours (7) - Default (C) */
    chancesOfRain: RainChancesForecast[]
  }

  type MappedForecastDay = MappedForecast & {
    /** City Name */
    city_name?: string
    /** Weather Condition description */
    description?: string
    /** Temperature (Average) - default (C) Feels like */
    temp?: number
    /** Wind Speed (default m/s) */
    wind_spd?: number
    /** Relative Humidity as a percentage (%) */
    rh?: number
    /** Pressure (mb) */
    pres?: number
    /** Average Visibility default (KM) */
    vis?: number
    /** Dewpoint?: Average) - default (C) */
    dewpt?: number
    /** Weekly weather Forecasts */
    weeklyForecasts?: MappedForecast[]
    /** Hourly detialed forecasts */
    hourlyForecasts?: MappedHourlyForecast[]
  }
}
