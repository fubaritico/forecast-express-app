declare namespace Express {
  interface Request {
    paramName?: string
    secondParam?: string

    test: WeatherbitAPI.CurrentObsGroup[]
  }
}
