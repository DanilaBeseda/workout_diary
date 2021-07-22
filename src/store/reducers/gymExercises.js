import {
   BIND_EXERCISES_DATA,
   ADD_SET,
   DELETE_SET
} from '../constants/actionTypes'

const initialState = {
   exercises: {}
}

export const gymExercises = (state = initialState, action) => {
   switch (action.type) {
      case BIND_EXERCISES_DATA: {
         const data = action.payload.data

         if (data) {
            Object.values(data).map(exercise => {
               if (exercise.sets[0].reps === 0) {
                  exercise.sets = []
               }
               exercise.isEdit = action.payload.isEdit
               return exercise
            })
         }
         return {
            ...state, exercises: data
         }
      }
      case ADD_SET: {
         const cloneExercises = state.exercises
         cloneExercises[action.payload.exerciseKey].sets.push(action.payload.set)

         return {
            ...state, exercises: cloneExercises
         }
      }
      case DELETE_SET: {
         const cloneExercises = state.exercises
         const sets = cloneExercises[action.payload.exerciseKey].sets.filter(set => (
            set.id !== action.payload.setId
         ))

         cloneExercises[action.payload.exerciseKey].sets = sets

         return {
            ...state, exercises: cloneExercises
         }
      }
      default:
         return state
   }
}
