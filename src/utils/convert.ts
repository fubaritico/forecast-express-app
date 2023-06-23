import moment from 'moment'
import momentTz from 'moment-timezone'

export const toKmPerHour = (value: number): number => value * (18 / 5)

export const fromCelciusToFahrenheit = (value: number, metric = true): number =>
  metric ? value : (value * 9) / 5 + 32

export const fromMillibarsToInchesOfMercury = (
  value: number,
  metric = true
): number => (metric ? value : value / 33.864)

export const round = (value: number): number => Math.round(value)

export const timestampInMs = (ts: number): number => {
  if (ts.toString().length === 14) return ts
  return ts * 1000
}

/**
 * Will convert a UTC date without into a local date string.
 *
 * @param {number} ts - unix UTC timestamp in seconds
 * @param {string} timezone - a time zone in Local IANA Timezone format
 * @param {string} mask - a format mask applied to the result after subtracting offset, defaults to 'ddd Do MMM YYYY, hh:mm:ss a'
 *
 * @returns The date converted in local time in format 'ddd Do MMM YYYY, hh:mm:ss a' by default
 */
export const getFormattedDateFromTimezone = (
  ts: number,
  timezone: string,
  mask = 'ddd Do MMM YYYY, hh:mm:ss a'
): string => {
  // Getting UTC offset from timezone name & utc timestamp
  const timestamp = timestampInMs(ts)
  const zone = momentTz.tz.zone(timezone)
  // const hoursOffset = (zone.parse(timestamp) / 60) * -1; // Gets 9 (hours)

  // With utcOffset
  const minutesOffset = zone.utcOffset(timestamp) // Gets -540 (minutes)

  // Getting tokio actual (local) time from utc
  const momentUtcTimeFromTimestamp = moment(timestamp).clone().utc()
  const localTime = momentUtcTimeFromTimestamp
    .clone()
    .subtract(minutesOffset, 'minutes')

  return localTime.format(mask)
}

/**
 * Will convert a UTC time without a provided day into a local time string.
 *
 * @param {string} time - time as a string in format '15:45'
 * @param {string} timezone - a time zone in Local IANA Timezone format
 *
 * @returns The time converted in local time in format '3:45pm' with the according offset
 */
const getFormattedTimeFromTimezone = (time: string, timezone: string) => {
  const nowInUtcMode = moment().clone().utc()

  const parsedTime = time.split(':')
  const hours = parseInt(parsedTime[0])
  const minutes = parseInt(parsedTime[1])

  nowInUtcMode.set('hours', hours)
  nowInUtcMode.set('minutes', minutes)

  const utcTimestamp = Number(nowInUtcMode.format('X'))

  return getFormattedDateFromTimezone(utcTimestamp, timezone, 'h:mma')
}

export const timeToProps = (time: string, timezone: string): TimeProps => {
  return {
    date: time,
    formatted: getFormattedTimeFromTimezone(time, timezone),
  }
}

export const dateToWeekDay = (
  timestampLocal: number,
  timezone?: string
): DateProps => {
  const timestamp = timestampInMs(timestampLocal)
  const nowInUtcMode = moment(timestamp).clone().utc()
  let localTime

  if (timezone) {
    const zone = momentTz.tz.zone(timezone)
    const minutesOffset = zone.utcOffset(timestamp)

    const momentUtcTimeFromTimestamp = moment(timestamp).clone().utc()
    localTime = momentUtcTimeFromTimestamp
      .clone()
      .subtract(minutesOffset, 'minutes')
  }

  return {
    timestamp,
    weekDay: nowInUtcMode.format('ddd'),
    formatted: localTime ? localTime.format('ddd, h:mm a') : undefined,
  }
}

export const timestampLocalToProps = (
  timestampLocal: string,
  index: number
): LocalTimeStampProps => {
  const date = moment(timestampLocal)

  return {
    value: timestampLocal,
    display: index === 0 ? 'NOW' : date.format('ha'),
  }
}
