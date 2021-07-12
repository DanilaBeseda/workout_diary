import { combineReducers } from "redux"

import { calendar } from './calendar'
import { musсleGroups } from './muscleGroups'

const rootReducer = combineReducers({
   calendar,
   musсleGroups
})

export default rootReducer