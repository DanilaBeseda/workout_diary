import {
   BIND_DATA
} from '../constants/actionTypes'

const initialState = {
   groups: []
}

export const musсleGroups = (state = initialState, action) => {
   switch (action.type) {
      case BIND_DATA:
         return {
            ...state, groups: action.payload
         }
      default:
         return state
   }
}