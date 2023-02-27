import { fromMillibarsToInchesOfMercury } from '@Utils/convert'

const units = (metric: boolean) => {
  if (metric) {
    return {
      temperature: 'C',
      speed: 'm/s',
      precipitation: 'mm',
      pressure: 'mb',
    }
  }

  return {
    temperature: 'F',
    speed: 'mph',
    precipitation: 'in',
    pressure: 'in',
  }
}

export const applyPercentage = (value: number): string => `${value}%`
export const applyPressureUnits = (value: number, metric = true): string =>
  `${fromMillibarsToInchesOfMercury(value, metric)}${units(metric).pressure}`
export const applyKilometers = (value: number): string => `${value}km`
export const applyDegreesShort = (value: number): string => `${value}°`
export const applyDegreesLong = (value: number, metric = true): string =>
  `${value}°C`
export const applyKmPerHour = (value: number): string => `${value}km/h`
