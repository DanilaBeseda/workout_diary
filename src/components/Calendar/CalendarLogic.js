export const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
export const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

export function getMonthData(year, month) {
   const monthData = []
   const date = new Date(year, month)
   let day = 1

   const daysInWeek = 7
   const daysInMonth = 32 - new Date(year, month, 32).getDate()
   const weekDaysFromMonday = [6, 0, 1, 2, 3, 4, 5]
   const monthStartOn = weekDaysFromMonday[date.getDay()]

   for (let i = 0; i < Math.ceil((daysInMonth + monthStartOn) / daysInWeek); i++) {
      monthData[i] = []
      for (let j = 0; j < daysInWeek; j++) {
         if ((i === 0 && j < monthStartOn) || day > daysInMonth) {
            monthData[i][j] = undefined
         } else {
            monthData[i][j] = new Date(year, month, day++)
         }
      }
   }

   return monthData
}

export function areEqual(dateA, dateB) {
   if (!dateA || !dateB) return false

   return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
   )
}
