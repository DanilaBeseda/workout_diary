import {
   BIND_EXERCISES_DATA,
   ADD_EXERCISE,
   DELETE_EXERCISE
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

export const getExercisesData = (selectedDate) => (
   dispatch => {
      const database = firebase.database

      database().ref().child("date").child(`${Date.parse(selectedDate)}`).child("gymExercises").get().then(res => {
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

export const deleteExercise = (id, name, selectedDate) => (
   async dispatch => {
      const database = firebase.database

      if (name) {
         try {
            await database().ref(`date/${Date.parse(selectedDate)}/gymExercises/${id - 1}`).set(null)
            dispatch(getExercisesData(selectedDate))
         } catch (e) {
            alert('Произошла ошибка при обновлении данных')
            console.log(e)
         }
      } else {
         dispatch(deleteExerciseFromState(id))
      }
   }
)

export const setExerciseData = (exercise, name, comment, selectedDate) => (
   async dispatch => {
      const database = firebase.database
      try {
         await database().ref(`date/${Date.parse(selectedDate)}/gymExercises/${exercise.id - 1}`).set({
            'comment': comment,
            'id': exercise.id,
            'name': name,

            //!!!!!!!!!!!!!!!!!!!!!!!!! todo sets !!!!!!!!!!!!!!!!!!!!!!!!!!!
            'sets': [{
               'reps': 5,
               'weight': 150
            }]
         })
         dispatch(getExercisesData(selectedDate))
      } catch (e) {
         alert('Произошла ошибка при обновлении данных')
         console.error(e)
      }
   }
)