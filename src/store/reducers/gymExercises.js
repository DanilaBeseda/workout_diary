import {
   BIND_EXERCISES_DATA,
   ADD_SET,
   DELETE_SET
} from '../constants/actionTypes'

const initialState = {
   exercises: []
}

export const gymExercises = (state = initialState, action) => {
   switch (action.type) {
      case BIND_EXERCISES_DATA: {
         return {
            ...state, exercises: action.payload
         }
      }
      case ADD_SET: {
         const cloneExercises = state.exercises

         cloneExercises.map(exercise => {
            if (exercise.id === action.payload.exerciseId) {
               exercise.sets.push(action.payload.set)
            }

            return exercise
         })

         return {
            ...state, exercises: cloneExercises
         }
      }
      case DELETE_SET: {
         const cloneExercises = state.exercises

         cloneExercises.map(exercise => {
            if (exercise.id === action.payload.exerciseId) {
               const sets = exercise.sets.filter(set => (
                  set.id !== action.payload.setId
               ))
               exercise.sets = sets
            }

            return exercise
         })

         return {
            ...state, exercises: cloneExercises
         }
      }
      default:
         return state
   }
}
