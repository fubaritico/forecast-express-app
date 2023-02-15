export default function toQueryString(obj: ObjectToStringQuery) {
  return Object.keys(obj).reduce(
    (qs, key, currentIndex) =>
      `${qs}${key}=${obj[key]}${
        currentIndex !== Object.keys(obj).length - 1 ? '&' : ''
      }`,
    '?'
  )
}
