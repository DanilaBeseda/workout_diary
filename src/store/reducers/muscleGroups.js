import {
   BIND_DATA,
   CHANGE_CHACKED
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
      case CHANGE_CHACKED:
         const cloneGroups = state.groups.map(group => {
            if (group.id === action.payload.id) return action.payload
            return group
         })
         return {
            ...state, groups: cloneGroups
         }
      default:
         return state
   }
}