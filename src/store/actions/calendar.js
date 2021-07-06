import {
   PREV_MONTH,
   NEXT_MONTH,
   SELECT_YEAR_AND_MONTH,
   SELECT_ACTIVE_DATE
} from '../constants/actionTypes'

export const prevMonth = (date) => ({
   type: PREV_MONTH,
   date
})

export const nextMonth = (date) => ({
   type: NEXT_MONTH,
   date
})

export const selectYearAndMonth = (newDate) => ({
   type: SELECT_YEAR_AND_MONTH,
   payload: newDate
})

export const selectActiveDate = (newDate) => ({
   type: SELECT_ACTIVE_DATE,
   payload: newDate
})