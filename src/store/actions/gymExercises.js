import {
   BIND_EXERCISES_DATA,
   ADD_SET,
   DELETE_SET
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/database'

export const bindExercisesDataToState = (data, isEdit = false) => ({
   type: BIND_EXERCISES_DATA,
   payload: { data, isEdit }
})

export const addExercise = (selectedDate, userUID) => (
   async dispatch => {
      const database = firebase.database

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises`).push().set({
            comment: '',
            name: 'Упражнение',
            sets: [{ weight: 0, reps: 0, id: 0 }]
         })

         dispatch(getExercisesData(selectedDate, userUID, true))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)

export const getExercisesData = (selectedDate, userUID, isEdit = false) => (
   dispatch => {
      const database = firebase.database

      database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises`).get().then(res => {
         if (res.exists()) {
            dispatch(bindExercisesDataToState(res.val(), isEdit))
         } else {
            dispatch(bindExercisesDataToState({}))
         }
      }).catch(e => {
         alert('Произошла ошибка при получении данных')
         console.error(e)
      })
   }
)

export const deleteExercise = (exerciseKey, selectedDate, userUID) => (
   async dispatch => {
      const database = firebase.database

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises/${exerciseKey}`).set(null)
         dispatch(getExercisesData(selectedDate, userUID))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)

export const setExerciseData = (sets, name, comment, selectedDate, userUID, exerciseKey) => (
   async dispatch => {
      const database = firebase.database

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises/${exerciseKey}`).set({
            comment: comment,
            name: name,
            sets: sets.length ? sets : [{ weight: 0, reps: 0, id: 0 }]
         })

         dispatch(getExercisesData(selectedDate, userUID))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)

export const addSet = (set, exerciseKey) => ({
   type: ADD_SET,
   payload: { set, exerciseKey }
})

export const deleteSet = (setId, exerciseKey) => ({
   type: DELETE_SET,
   payload: { setId, exerciseKey }
})
