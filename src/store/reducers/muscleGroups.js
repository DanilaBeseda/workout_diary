import {
   CHANGE_CHECKED,
   BIND_DATA
} from '../constants/actionTypes'

const initialState = {
   groups: [],
   key: null
}

export const musсleGroups = (state = initialState, action) => {
   switch (action.type) {
      case CHANGE_CHECKED:
         //const check = state.groups.find(group => group.id = action.payload.id).checked
         return {
            ...state
         }
      case BIND_DATA:
         return {
            ...state, groups: action.payload.data, key: action.payload.key
         }
      default:
         return state
   }
}