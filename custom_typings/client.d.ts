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
    /** Timestamp in local time */
    dateLocal?: DateProps
  }>

  /** List of current observations */
  type GetCurrentDefaultObservationsResponse = MappedObservation[]

  type DateProps = {
    /** Untouched date */
    timestamp?: number
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

  type ChartValue = {
    /** Untouched value */
    value: number
    /** Formatted value with unit */
    display: string
  }

  /** Chart data with time and value */
  type ChartData = {
    /** Cloud cover as a percentage (%) */
    chartValue: ChartValue
    /** Timestamp in local time */
    timestampLocal: LocalTimeStampProps
  }

  type MappedHourlyForecast = {
    /** List of temperature forecast every next hours (7) - Default (°C) */
    temperatures: ChartData[]
    /** List of chances of rain forecast every 3 hours (7) - Default (%) */
    chancesOfRain: ChartData[]
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
    /** chances of rain as a percentage (%) */
    chancesOfRain?: string
    /**
     * Icon code for forecast image display
     * Weather icon code: 't01d', 't02d', etc
     * @see: https://www.weatherbit.io/api/codes
     * */
    weatherIcon?: string
  }

  /** Detailed Forecast data for one given day */
  type MappedForecastDay = {
    currentObservation: MappedObservation & {
      /** Apparent Maximum daily Temperature - default (°C) */
      apparentMaximumTemperature?: string
      /** Apparent Minimum daily Temperature - default (°C) */
      apparentMinimumTemperature?: string
      /** Relative Humidity as a percentage (%) */
      relativeHumidity?: string
      /** Temperature (Average) - default (°C) Feels like */
      feelsLike?: string
      /** Wind Speed (default km/h) */
      windSpeed?: string
      /** Pressure (mb) */
      pressure?: string
      /** Average Visibility default (KM) */
      visibility?: string
      /** Dewpoint (Average) - default (°C) */
      dewPoint?: string
    }
    /** Weekly weather Forecasts */
    dailyForecasts: MappedForecast[]
    /** Hourly detailed forecasts */
    hourlyForecasts: MappedHourlyForecast
  }

  /** Detailed data, forecasts for a given observation */
  type GetDetailedForecatsResponse = MappedForecastDay
}
