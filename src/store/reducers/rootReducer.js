import { combineReducers } from "redux"

import { calendar } from './calendar'
import { musсleGroups } from './muscleGroups'
import { gymExercises } from './gymExercises'

const rootReducer = combineReducers({
   calendar,
   musсleGroups,
   gymExercises
})

export default rootReducer