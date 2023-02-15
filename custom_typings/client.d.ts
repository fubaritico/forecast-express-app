export {}

declare global {
  /** Latitude & longitude (Degrees) */
  type Coordinates = {
    /** Latitude (Degrees) */
    lat: number
    /** Longitude (Degrees) */
    lon: number
  }

  type Test = {
    test: string
  }

  type MappedForecast = Partial<{
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
    code: number
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

  type Observation = MappedForecast
}
