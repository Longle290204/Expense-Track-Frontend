import dayjs from 'dayjs'

export function formatDate(ts: Date) {
  return dayjs(ts).format('YYYY-MM-DD HH:mm:ss')
}
