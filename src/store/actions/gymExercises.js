import {
   BIND_EXERCISES_DATA,
   ADD_SET,
   DELETE_SET
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/database'

export const bindExercisesDataToState = (data) => ({
   type: BIND_EXERCISES_DATA,
   payload: data
})

export const addExercise = (selectedDate, userUID, exercises) => (
   async dispatch => {
      const database = firebase.database

      exercises.push({
         id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
         comment: '',
         name: 'Упражнение',
         sets: [{ weight: 0, reps: 0, id: 0 }]
      })

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises`).set(exercises)
         dispatch(getExercisesData(selectedDate, userUID))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)

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

export const deleteExercise = (selectedDate, userUID, exercises, arrayIndex) => (
   async dispatch => {
      const database = firebase.database

      exercises.splice(arrayIndex, 1)

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises`).set(exercises)
         dispatch(getExercisesData(selectedDate, userUID))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)

export const setExerciseData = (id, sets, name, comment, selectedDate, userUID, arrayIndex) => (
   async dispatch => {
      const database = firebase.database

      try {
         await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises/${arrayIndex}`).set({
            id: id,
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

export const addSet = (set, exerciseId) => ({
   type: ADD_SET,
   payload: { set, exerciseId }
})

export const deleteSet = (setId, exerciseId) => ({
   type: DELETE_SET,
   payload: { setId, exerciseId }
})

export const moveExercise = (exercises, arrayIndex, userUID, selectedDate, isMoveUp = false) => (
   async dispatch => {
      let isChanged = false

      if (isMoveUp && arrayIndex !== 0) {
         [exercises[arrayIndex], exercises[arrayIndex - 1]] = [exercises[arrayIndex - 1], exercises[arrayIndex]]
         isChanged = true
      } else if (!isMoveUp && arrayIndex + 1 !== exercises.length) {
         [exercises[arrayIndex], exercises[arrayIndex + 1]] = [exercises[arrayIndex + 1], exercises[arrayIndex]]
         isChanged = true
      }

      if (isChanged) {
         const database = firebase.database

         console.log(exercises)

         try {
            await database().ref(`date/${userUID}/${Date.parse(selectedDate)}/gymExercises`).set(exercises)
            dispatch(getExercisesData(selectedDate, userUID))
         } catch (e) {
            alert('Произошла ошибка при обновлении данных')
            console.error(e)
         }
      }
   }
)
