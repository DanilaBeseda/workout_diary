import {
   PREV_MONTH,
   NEXT_MONTH,
   SELECT_YEAR_AND_MONTH,
   SELECT_ACTIVE_DATE,
   NEXT_YEAR,
   PREV_YEAR,
   SET_FILLED_DATES
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/database'

export const prevMonth = date => ({
   type: PREV_MONTH,
   date
})

export const nextMonth = date => ({
   type: NEXT_MONTH,
   date
})

export const prevYear = date => ({
   type: PREV_YEAR,
   date
})

export const nextYear = date => ({
   type: NEXT_YEAR,
   date
})

export const selectYearAndMonth = newDate => ({
   type: SELECT_YEAR_AND_MONTH,
   payload: newDate
})

export const selectActiveDate = newDate => ({
   type: SELECT_ACTIVE_DATE,
   payload: newDate
})

export const setFilledDates = filledDates => ({
   type: SET_FILLED_DATES,
   payload: filledDates
})

export const getAllUserData = (userUID) => (
   dispatch => {
      const database = firebase.database

      database().ref(`date/${userUID}`).on('value', res => {
         if (res.exists()) {
            dispatch(setFilledDates(Object.keys(res.val()).map(item => parseInt(item))))
         }
      })
   }
)