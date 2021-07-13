import {
   BIND_DATA
} from '../constants/actionTypes'

import muscleGroups from '../../assets/muscleGroups'
import firebase from 'firebase/app'
import 'firebase/database'

export const bindDataToState = (data) => ({
   type: BIND_DATA,
   payload: data
})

export const getData = (selectedDate) => (
   dispatch => {
      const database = firebase.database

      database().ref().child("date").child(`${Date.parse(selectedDate)}`).child("muscleGroups").get().then((res) => {
         if (res.exists()) {
            dispatch(bindDataToState(res.val()))
         } else {
            dispatch(bindDataToState(muscleGroups))
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

      if (data.find(item => item.checked === true)) {
         try {
            await database().ref(`date/${Date.parse(selectedDate)}/muscleGroups`).set(data)
         } catch (e) {
            alert('Не удалось отправить данные на сервер')
            console.error(e)
         }
      }
   }
)