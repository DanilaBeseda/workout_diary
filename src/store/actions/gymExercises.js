import {
   BIND_EXERCISES_DATA,
   ADD_EXERCISE,
   DELETE_EXERCISE,
   ADD_SET,
   DELETE_SET
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/database'

export const bindExercisesDataToState = (data) => ({
   type: BIND_EXERCISES_DATA,
   payload: data
})

export const addExercise = () => ({
   type: ADD_EXERCISE
})

export const getExercisesData = (selectedDate, userUID) => (
   dispatch => {
      const database = firebase.database

      database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises`).get().then(res => {
         if (res.exists()) {
            dispatch(bindExercisesDataToState(res.val()))
         } else {
            dispatch(bindExercisesDataToState([]))
         }
      }).catch(e => {
         alert('Произошла ошибка при получении данных')
         console.error(e)
      })
   }
)

export const deleteExerciseFromState = (id) => ({
   type: DELETE_EXERCISE,
   payload: id
})

export const deleteExercise = (id, name, selectedDate, userUID) => (
   async dispatch => {
      const database = firebase.database

      if (name) {
         try {
            await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises/${id - 1}`).set(null)
            dispatch(getExercisesData(selectedDate, userUID))
         } catch (e) {
            alert('Произошла ошибка при обновлении данных')
            console.log(e)
         }
      } else {
         dispatch(deleteExerciseFromState(id))
      }
   }
)

export const setExerciseData = (exercise, name, comment, selectedDate, userUID) => (
   async dispatch => {
      const database = firebase.database

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises/${exercise.id - 1}`).set({
            comment: comment,
            id: exercise.id,
            name: name,
            sets: exercise.sets.length ? exercise.sets : [{ weight: 0, reps: 0, id: 0 }]
         })

         dispatch(getExercisesData(selectedDate, userUID))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)

export const addSet = (set, id) => ({
   type: ADD_SET,
   payload: { set, id }
})

export const deleteSet = (setId, exerciseId) => ({
   type: DELETE_SET,
   payload: { setId, exerciseId }
})
