import {
   BIND_DATA,
   CHANGE_CHACKED
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/database'

export const bindDataToState = (data) => ({
   type: BIND_DATA,
   payload: data
})

export const changeChacked = (group) => ({
   type: CHANGE_CHACKED,
   payload: group
})

export const getData = (selectedDate) => (
   dispatch => {
      const database = firebase.database

      database().ref().child("date").child(`${Date.parse(selectedDate)}`).child("muscleGroups").get().then((res) => {
         if (res.exists()) {
            dispatch(bindDataToState(res.val()))
         } else {
            database().ref().child("muscleGroupsDefault").get().then(res => {
               dispatch(bindDataToState(res.val()))
            })
         }
      }).catch(e => {
         alert('Не удалось получить данные с сервера')
         console.error(e)
      })
   }
)

export const setData = (data, selectedDate) => (
   async () => {
      const database = firebase.database
      const ref = `date/${Date.parse(selectedDate)}/muscleGroups`

      try {
         if (data.find(item => item.checked === true)) {
            await database().ref(ref).set(data)
         } else {
            const res = await database().ref().child("date").child(`${Date.parse(selectedDate)}`).child("gymExercises").get()
            if (!res.val()) {
               await database().ref(ref).set(null)
            }
         }
      } catch (e) {
         alert('Не удалось отправить данные на сервер')
         console.error(e)
      }
   }
)