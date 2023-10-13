import { format, utcToZonedTime } from 'date-fns-tz'

interface FormatOptions {
  date: Date
  /** 時間を含むか判断するフラグ */
  includeTime?: boolean
}

// タイムゾーン（UTC）からクライアントのタイムゾーンへ変換するフォーマット関数
export const formatDateWithTimeZone = ({
  date,
  includeTime,
}: FormatOptions) => {
  const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  let formatString = 'yyyy/MM/dd'

  if (includeTime) {
    formatString += ' HH:mm'
  }

  const zonedDate = utcToZonedTime(date, detectedTimeZone)
  return format(zonedDate, formatString, { timeZone: detectedTimeZone })
}
