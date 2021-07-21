import {
   PREV_MONTH,
   NEXT_MONTH,
   SELECT_YEAR_AND_MONTH,
   SELECT_ACTIVE_DATE,
   PREV_YEAR,
   NEXT_YEAR,
   SET_FILLED_DATES
} from "../constants/actionTypes"

const newDate = new Date()

const initialState = {
   date: newDate,
   selectedDate: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()),
   filledDates: []
}

export const calendar = (state = initialState, action) => {
   switch (action.type) {
      case PREV_MONTH:
         return {
            ...state, date: new Date(action.date.getFullYear(), action.date.getMonth() - 1)
         }
      case NEXT_MONTH:
         return {
            ...state, date: new Date(action.date.getFullYear(), action.date.getMonth() + 1)
         }
      case PREV_YEAR:
         return {
            ...state, date: new Date(action.date.getFullYear() - 1, action.date.getMonth())
         }
      case NEXT_YEAR:
         return {
            ...state, date: new Date(action.date.getFullYear() + 1, action.date.getMonth())
         }
      case SELECT_YEAR_AND_MONTH:
         return {
            ...state, date: action.payload
         }
      case SELECT_ACTIVE_DATE:
         return {
            ...state, selectedDate: action.payload
         }
      case SET_FILLED_DATES:
         return {
            ...state, filledDates: action.payload
         }
      default:
         return state
   }
}