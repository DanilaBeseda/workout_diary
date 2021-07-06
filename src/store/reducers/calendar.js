import {
   PREV_MONTH,
   NEXT_MONTH,
   SELECT_YEAR_AND_MONTH,
   SELECT_ACTIVE_DATE
} from "../constants/actionTypes"

const initialState = {
   date: new Date(),
   selectedDate: new Date()
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
      case SELECT_YEAR_AND_MONTH:
         return {
            ...state, date: action.payload
         }
      case SELECT_ACTIVE_DATE:
         return {
            ...state, selectedDate: action.payload
         }
      default:
         return state
   }
}