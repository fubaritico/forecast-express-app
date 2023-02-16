import moment from 'moment'

export const toKmPerHour = (value: number): number => value * (18 / 5)

export const round = (value: number): number => Math.round(value)

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
