import {
   BIND_GROUPS_DATA,
   CHANGE_CHACKED
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/database'

export const bindGroupsDataToState = (data) => ({
   type: BIND_GROUPS_DATA,
   payload: data
})

export const changeChacked = (group) => ({
   type: CHANGE_CHACKED,
   payload: group
})

export const getGroupsData = (selectedDate) => (
   dispatch => {
      const database = firebase.database

      database().ref().child("date").child(`${Date.parse(selectedDate)}`).child("muscleGroups").get().then((res) => {
         if (res.exists()) {
            dispatch(bindGroupsDataToState(res.val()))
         } else {
            database().ref().child("muscleGroupsDefault").get().then(res => {
               dispatch(bindGroupsDataToState(res.val()))
            })
         }
      }).catch(e => {
         alert('Произошла ошибка при получении данных')
         console.error(e)
      })
   }
)

export const setGroupsData = (data, selectedDate) => (
   async () => {
      const database = firebase.database
      const ref = `date/${Date.parse(selectedDate)}/muscleGroups`

      try {
         if (data.find(item => item.checked === true)) {
            await database().ref(ref).set(data)
         } else {
            const res = await database().ref().child("date").child(`${Date.parse(selectedDate)}`).child("gymExercises").get()
            if (!res.exists()) {
               await database().ref(ref).set(null)
            }
         }
      } catch (e) {
         alert('Что-то пошло не так')
         console.error(e)
      }
   }
)