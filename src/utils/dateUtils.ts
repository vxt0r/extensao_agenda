export function formatDatetimeSqlite (datetime: string){
  const [date, time] = datetime.split(' ')
  const [d, m, y] = date.split('/')
  return `20${y}-${m}-${d} ${time}:00`
}

export function formatDateTimeView(dateTime: string): string {
  const date = new Date(dateTime)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export function isSameWeek(date : Date) {
  const today = new Date();
  const dayOfWeek = today.getDay() 
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - dayOfWeek) 
  startOfWeek.setHours(0, 0, 0, 0)
  const endOfWeek = new Date(today)
  endOfWeek.setDate(today.getDate() + (6 - dayOfWeek)) 
  endOfWeek.setHours(23, 59, 59, 999)
  return date >= startOfWeek && date <= endOfWeek
}


