import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { prevMonth, nextMonth, prevYear, nextYear, selectYearAndMonth, selectActiveDate } from '../../store/actions/calendar'
import { getMonthData, areEqual } from './CalendarLogic'

import classes from './Calendar.module.scss'

export const Calendar = () => {
   const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
   const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

   const dispatch = useDispatch()
   const { date, selectedDate } = useSelector(({ calendar }) => calendar)
   const mountData = getMonthData(date.getFullYear(), date.getMonth())
   const monthRef = useRef(null)

   return (
      <div className={classes.calendar}>
         <div className={classes.selects}>
            <button className={classes.btnMonth} onClick={() => dispatch(prevMonth(date))}>{'<'}</button>

            <select
               ref={monthRef}
               onChange={() => dispatch(selectYearAndMonth(new Date(date.getFullYear(), monthRef.current.value)))}
               value={date.getMonth()}
            >
               {monthNames.map((item, index) => (
                  <option key={index} value={index}>{item}</option>
               ))}
            </select>

            <div className={classes.year}>
               <button className={classes.btnYear} onClick={() => dispatch(prevYear(date))}>{'<'}</button>
               <p>{date.getFullYear()}</p>
               <button className={classes.btnYear} onClick={() => dispatch(nextYear(date))}>{'>'}</button>
            </div>

            <button className={classes.btnMonth} onClick={() => dispatch(nextMonth(date))}>{'>'}</button>
         </div>

         <table>
            <thead>
               <tr>
                  {weekDayNames.map((item, index) => (
                     <th key={index}>{item}</th>
                  ))}
               </tr>
            </thead>

            <tbody>
               {mountData.map((week, index) => (
                  <tr key={index}>

                     {week.map((date, index) => (
                        date
                           ? <td
                              key={index}
                              className={[classes.day, areEqual(date, selectedDate) && classes.today].join(' ')}
                              onClick={() => dispatch(selectActiveDate(date))}
                           >{date.getDate()}</td>
                           : <td key={index}></td>
                     ))}

                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}