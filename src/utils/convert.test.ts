import { describe, expect, it } from '@jest/globals'
import { getFormattedDateFromTimezone } from './convert'

describe('getFormattedDateFromTimezone', () => {
  it('should return correct formatted date when provided with timestamp & timezone', () => {
    const formattedDate = getFormattedDateFromTimezone(1676755362, 'Asia/Tokyo')
    expect(formattedDate).toBe('Sun 19th Feb 2023, 06:22:42 am')
  })
})
