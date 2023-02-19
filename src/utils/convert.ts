import moment from 'moment'
import momentTz from 'moment-timezone'

export const toKmPerHour = (value: number): number => value * (18 / 5)

export const round = (value: number): number => Math.round(value)

export const timestampInMs = (ts: number): number => {
  if (ts.toString().length === 14) return ts
  return ts * 1000
}

export const getFormattedDateFromTimezone = (
  ts: number,
  timezone: string
): string => {
  // Getting UTC offset from timezone name & utc timestamp
  const timestamp = timestampInMs(ts)
  const zone = momentTz.tz.zone(timezone)
  // const hoursOffset = (zone.parse(timestamp) / 60) * -1 // Gets 9 (hours)

  // With utcOffset
  const minutesOffset = zone.utcOffset(timestamp) // Gets -540 (minutes)

  // Getting place actual (local) time from utc
  const momentFromTimestamp = moment(timestamp).clone().utc()
  const actualTime = momentFromTimestamp
    .clone()
    .subtract(minutesOffset, 'minutes')

  // console.log('-------------------------------')
  // console.log('hoursOffset:         ', hoursOffset)
  // console.log('minutesOffset:       ', minutesOffset)
  // console.log('momentFromTimestamp: ', momentFromTimestamp)
  // console.log('actualTime:     ', actualTime)

  return actualTime.format('ddd Do MMM YYYY, hh:mm:ss a')
}

export const getUtcOffsetFromLocalTime = () => {
  // Moment instance where we get the offset from
  // moment.parseZone() parses the string but keeps the resulting Moment object
  // in a fixed-offset timezone with the provided offset in the string.
  // Get current time in local time
  const defaultLocalTime = moment().format()
  const momentFromZone = moment.parseZone(defaultLocalTime).clone()
  const timestampFromZone = Number(momentFromZone.format('x'))
  const utcOffsetFromZone = momentFromZone.utcOffset()
  console.log('-------------------------------')
  console.log('momentFromZone: ', momentFromZone)
  console.log('timestampFromZone: ', timestampFromZone)
  console.log('utcOffsetFromZone: ', utcOffsetFromZone)

  // Get current time in UTC time by switching in UTC mode
  const utcTime = moment().clone().utc().format()

  // Moment instance we get the local offset from (Gets 0 while it should be 60)
  const utcOffset = moment().utcOffset()
  console.log('-------------------------------')
  console.log('defaultLocalTime: ', defaultLocalTime)
  console.log('utcTime: ', utcTime)
  console.log('utcOffset: ', utcOffset)
}

export const timeToProps = (time: string): TimeProps => {
  const parsedTime = time.split(':')
  const hour = parseInt(parsedTime[0])
  const minutes = parseInt(parsedTime[1])

  return {
    date: time,
    formatted: `${hour >= 13 ? hour - 12 : hour}:${
      minutes.toString().length === 2 ? minutes : '0' + minutes
    }${hour >= 12 ? 'pm' : 'am'}`,
  }
}

export const dateToProps = (date: string): DateProps => {
  const d = moment(date)

  return {
    date,
    weekDay: d.format('ddd'),
    formatted: d.format('ddd, h:mm a'),
  }
}

export const timestampLocalToProps = (
  timestampLocal: string
): LocalTimeStampProps => {
  const date = moment(timestampLocal)
  const now = moment()
  let nowHours = now.hour()

  if (now.minute() > 0) nowHours++

  return {
    value: timestampLocal,
    display: nowHours === date.hour() ? 'NOW' : date.format('ha'),
  }
}
