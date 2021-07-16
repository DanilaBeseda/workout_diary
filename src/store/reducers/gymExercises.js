import {
   BIND_EXERCISES_DATA,
   ADD_EXERCISE,
   DELETE_EXERCISE
} from '../constants/actionTypes'

const initialState = {
   exercises: []
}

export const gymExercises = (state = initialState, action) => {
   switch (action.type) {
      case BIND_EXERCISES_DATA: {
         const data = action.payload

         if (data) {
            data.map(exercise => {
               if (exercise.sets[0].reps === 0) {
                  exercise.sets = []
               }
               exercise.isEdit = false
               return exercise
            })
         }
         return {
            ...state, exercises: data
         }
      }

      case ADD_EXERCISE: {
         const cloneExercises = state.exercises
         const id = cloneExercises.length + 1

         cloneExercises.push({
            comment: '',
            name: '',
            id,
            sets: [],
            isEdit: true
         })

         return {
            ...state, exercises: cloneExercises
         }
      }

      case DELETE_EXERCISE: {
         const cloneExercises = state.exercises.filter(exercise => (
            exercise.id !== action.payload
         ))

         return {
            ...state, exercises: cloneExercises
         }
      }
      default:
         return state
   }
}
