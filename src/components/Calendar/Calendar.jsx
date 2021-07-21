import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import { prevMonth, nextMonth, prevYear, nextYear, selectYearAndMonth, selectActiveDate, getAllUserData } from '../../store/actions/calendar'
import { getMonthData, areEqual, monthNames, weekDayNames } from './CalendarLogic'

import classes from './Calendar.module.scss'

export const Calendar = () => {
   const dispatch = useDispatch()
   const { date, selectedDate, filledDates } = useSelector(({ calendar }) => calendar)
   const { userUID } = useSelector(({ auth }) => auth)
   const mountData = getMonthData(date.getFullYear(), date.getMonth())

   const [toggle, setToggle] = useState(false)
   const [btnSide, setBtnSide] = useState('')

   useEffect(() => {
      userUID && dispatch(getAllUserData(userUID))
   }, [userUID, dispatch])

   function selectHandler(e) {
      dispatch(selectYearAndMonth(new Date(date.getFullYear(), e.target.value)))
   }

   function leftBtnMonthHandler() {
      dispatch(prevMonth(date))
      setBtnSide('left')
      setToggle(true)
   }

   function rightBtnMonthHandler() {
      dispatch(nextMonth(date))
      setBtnSide('right')
      setToggle(true)
   }

   function leftBtnYearHandler() {
      dispatch(prevYear(date))
      setBtnSide('left')
      setToggle(true)
   }

   function RightBtnYearHandler() {
      dispatch(nextYear(date))
      setBtnSide('right')
      setToggle(true)
   }

   function activeDateHandler(date) {
      dispatch(selectActiveDate(date))
   }

   return (
      <div className={classes.calendar}>
         <div className={classes.selects}>
            <button className={classes.btnMonth} onClick={leftBtnMonthHandler}>{'<'}</button>

            <select
               onChange={selectHandler}
               value={date.getMonth()}
            >
               {monthNames.map((item, index) => (
                  <option key={index} value={index}>{item}</option>
               ))}
            </select>

            <div className={classes.year}>
               <button className={classes.btnYear} onClick={leftBtnYearHandler}>{'<'}</button>
               <p>{date.getFullYear()}</p>
               <button className={classes.btnYear} onClick={RightBtnYearHandler}>{'>'}</button>
            </div>

            <button className={classes.btnMonth} onClick={rightBtnMonthHandler}>{'>'}</button>
         </div>

         <table>
            <thead>
               <tr>
                  {weekDayNames.map((item, index) => (
                     <th key={index}>{item}</th>
                  ))}
               </tr>
            </thead>

            <CSSTransition
               in={toggle}
               timeout={400}
               classNames={btnSide === 'right'
                  ? { enter: classes.rightEnter, enterActive: classes.Entering }
                  : { enter: classes.leftEnter, enterActive: classes.Entering }}
               onEntered={() => setToggle(false)}
            >
               <tbody>
                  {mountData.map((week, index) => (
                     <tr key={index} className={classes.line}>

                        {week.map((date, index) => (
                           date
                              ? <td
                                 key={index}
                                 className={[
                                    classes.day,
                                    areEqual(date, selectedDate) && classes.today,
                                    classes.animation
                                 ].join(' ')}
                                 onClick={() => activeDateHandler(date)}
                              >
                                 {filledDates.includes(Date.parse(date)) ? <span className={classes.fill}>{date.getDate()}</span> : date.getDate()}
                              </td>
                              : <td key={index}></td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </CSSTransition>
         </table>
      </div>
   )
}