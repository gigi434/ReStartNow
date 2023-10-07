import { format, utcToZonedTime } from 'date-fns-tz'

// タイムゾーン（UTC）からクライアントのタイムゾーンへ変換するフォーマット関数
export const formatDateWithTimeZone = (date: Date, timeZone: string) => {
  const zonedDate = utcToZonedTime(date, timeZone)
  return format(zonedDate, 'yyyy/MM/dd HH:mm', { timeZone })
}
