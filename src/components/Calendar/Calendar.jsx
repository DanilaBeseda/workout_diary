import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { prevMonth, nextMonth, selectYearAndMonth, selectActiveDate } from '../../store/actions/calendar'
import { getMonthData, areEqual } from './CalendarLogic'

import classes from './Calendar.module.scss'

export const Calendar = () => {
   const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
   const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
   const weekDayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

   const dispatch = useDispatch()
   const { date, selectedDate } = useSelector(state => state.calendar)
   const monthRef = useRef(null)
   const yearRef = useRef(null)

   const mountData = getMonthData(date.getFullYear(), date.getMonth())

   function prevMonthBtnClickHandler(date) {
      dispatch(prevMonth(date))
   }

   function nextMonthBtnClickHandler(date) {
      dispatch(nextMonth(date))
   }

   function selectChangeHandler() {
      const newDate = new Date(yearRef.current.value, monthRef.current.value)
      dispatch(selectYearAndMonth(newDate))
   }

   function dayClickHandler(date) {
      dispatch(selectActiveDate(date))
   }

   return (
      <div className={classes.calendar}>
         <div className={classes.selects}>
            <button onClick={() => prevMonthBtnClickHandler(date)}>{'<'}</button>

            <select ref={monthRef} onChange={selectChangeHandler} value={date.getMonth()}>
               {monthNames.map((item, index) => (
                  <option key={index} value={index}>{item}</option>
               ))}
            </select>

            <select ref={yearRef} onChange={selectChangeHandler} value={date.getFullYear()}>
               {years.map(item => (
                  <option key={item} value={item}>{item}</option>
               ))}
            </select>

            <button onClick={() => nextMonthBtnClickHandler(date)}>{'>'}</button>
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
                              onClick={() => dayClickHandler(date)}
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