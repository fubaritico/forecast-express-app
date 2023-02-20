export {}

declare global {
  /** Latitude & longitude (Degrees) */
  type Coordinates = {
    /** Latitude (Degrees) */
    lat: string
    /** Longitude (Degrees) */
    lon: string
  }

  /** time (HH:MM am) */
  type TimeProps = {
    /** Untouched date */
    date?: string
    /** Formatted date like <i>1:20am</i> */
    formatted?: string
  }

  /** Current weather of a place */
  type MappedObservation = Partial<{
    /**
     * City name
     * &city=Raleigh&country=US
     * &city=Raleigh,NC
     * &city=Raleigh,North+Carolina
     * */
    cityName: string
    /**  Apparent/"Feels Like" temperature default (°C) */
    temperature: string
    /** Latitude & longitude (Degrees) */
    coordinates: Coordinates
    /** Text weather description */
    weatherDescription: string
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
    weatherIcon: string
    /** Sunrise time (HH:MM am) */
    sunrise: TimeProps
    /** Sunset time (HH:MM am) */
    sunset: TimeProps
    /** Part of the day (d = day, n = night) */
    partOfTheDay?: string
  }>

  /** List of current observations */
  type GetCurrentDefaultObservationsResponse = MappedObservation[]

  type DateProps = {
    /** Untouched date */
    date?: string
    /** Week day like <i>Thu, Wed, etc</i> */
    weekDay?: string
    /** Formatted date like <i>Mon, 1:20am</i> */
    formatted?: string
  }

  type LocalTimeStampProps = {
    /** Untouched value */
    value: string
    /** Formatted value like <i>9°C or 9°</i> */
    display: string
  }

  /** List of temperature forecast every next hours (7) - Default (°C) */
  type TemperatureForecast = {
    /** Temperature - Default (°C) */
    temperature?: {
      /** Untouched value */
      value: number
      /** Formatted value like 9°C or 9° */
      display: string
    }
    /** Timestamp in local time */
    timestampLocal?: LocalTimeStampProps
  }

  /** List of chances of rain forecast every 3 hours (7) - Default (°C) */
  type ChancesOfRainForecast = {
    /** Cloud cover as a percentage (%) */
    chancesOfRain?: {
      /** Untouched value */
      value: number
      /** Formatted value like 10% */
      display: string
    }
    /** Timestamp in local time */
    timestampLocal?: LocalTimeStampProps
  }

  type MappedHourlyForecast = {
    /** List of temperature forecast every next hours (7) - Default (°C) */
    temperatures: TemperatureForecast[]
    /** List of chances of rain forecast every 3 hours (7) - Default (°C) */
    chancesOfRain: ChancesOfRainForecast[]
  }

  /** Forecast information displayed in detailed view for each incomming day */
  type MappedForecast = {
    /** Timestamp in local time */
    timestampLocal?: DateProps
    /** Date in format "YYYY-MM-DD:HH". All datetime is in (UTC) */
    dateTime?: string
    /** Unix Timestamp */
    unixTimeStamp?: string
    /** Timestamp UTC */
    timestampUtc?: string
    /** Apparent Maximum daily Temperature - default (°C) */
    apparentMaximumTemperature?: string
    /** Apparent Minimum daily Temperature - default (°C) */
    apparentMinimumTemperature?: string
    /** Relative Humidity as a percentage (%) */
    relativeHumidity?: string
    /**
     * Icon code for forecast image display
     * Weather icon code: 't01d', 't02d', etc
     * @see: https://www.weatherbit.io/api/codes
     * */
    weatherIcon?: string
    /**
     * Weather Condition code
     * ex: 200 for 'Thunderstorm with light rain'
     * @see: https://www.weatherbit.io/api/codes
     * */
    weatherCode?: string
  }

  type MappedForecastDay = MappedForecast & {
    /** City Name */
    cityName?: string
    /** Weather Condition description */
    weatherDescription?: string
    /** Temperature (Average) - default (°C) Feels like */
    averageTemperature?: string
    /** Wind Speed (default km/h) */
    windSpeed?: string
    /** Pressure (mb) */
    pressure?: string
    /** Average Visibility default (KM) */
    visibility?: string
    /** Dewpoint (Average) - default (°C) */
    dewPoint?: string
    /** Sunrise time from unix timestamp,<br>
     * formatted like <i>ddd Do MMM YYYY, hh:mm:ss a</i> */
    sunrise?: string
    /** Sunset time from unix timestamp,<br>
     * formatted like <i>ddd Do MMM YYYY, hh:mm:ss a</i> */
    sunset?: string
    /** Weekly weather Forecasts */
    dailyForecasts: MappedForecast[] | Record<string, unknown>
    /** Hourly detailed forecasts */
    hourlyForecasts?: MappedHourlyForecast[] | Record<string, unknown>
  }

  /** Detailed data, forecasts for a given observation */
  type GetDetailedForecatsResponse = MappedForecastDay
}
