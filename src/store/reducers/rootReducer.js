import { combineReducers } from "redux"

import { calendar } from './calendar'
import { musсleGroups } from './muscleGroups'
import { gymExercises } from './gymExercises'
import { auth } from './auth'

const rootReducer = combineReducers({
   calendar,
   musсleGroups,
   gymExercises,
   auth
})

export default rootReducer