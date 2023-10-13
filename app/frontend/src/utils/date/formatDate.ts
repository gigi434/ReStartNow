import { format, utcToZonedTime } from 'date-fns-tz'

interface FormatOptions {
  /** 時間を含むか判断するフラグ */
  includeTime?: boolean
}

// タイムゾーン（UTC）からクライアントのタイムゾーンへ変換するフォーマット関数
export const formatDateWithTimeZone = (
  date: Date,
  timeZone?: string,
  options?: FormatOptions
) => {
  const detectedTimeZone =
    timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone

  let formatString = 'yyyy/MM/dd'

  if (options?.includeTime) {
    formatString += ' HH:mm'
  }

  const zonedDate = utcToZonedTime(date, detectedTimeZone)
  return format(zonedDate, formatString, { timeZone: detectedTimeZone })
}
