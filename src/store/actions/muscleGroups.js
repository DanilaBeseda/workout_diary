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

export const getGroupsData = (selectedDate, userUID) => (
   dispatch => {
      const database = firebase.database

      function setDefaultDatabase() {
         database().ref().child("muscleGroupsDefault").get().then(res => {
            dispatch(bindGroupsDataToState(res.val()))
         }).catch(e => {
            alert('Не удалось получить дефолтные данные')
            console.error(e)
         })
      }

      if (userUID) {
         database().ref(`date/${userUID}/${Date.parse(selectedDate)}/muscleGroups`).get().then((res) => {
            if (res.exists()) {
               dispatch(bindGroupsDataToState(res.val()))
            } else {
               setDefaultDatabase()
            }
         }).catch(e => {
            alert('Произошла ошибка при получении данных')
            console.error(e)
         })
      } else {
         setDefaultDatabase()
      }
   }
)

export const setGroupsData = (data, selectedDate, userUID) => (
   async () => {
      const database = firebase.database
      const ref = `date/${userUID}/${Date.parse(selectedDate)}/`

      try {
         if (data.find(item => item.checked === true)) {
            await database().ref(ref + 'muscleGroups').set(data)
         } else {
            const res = await database().ref(ref + 'gymExercises').get()
            if (!res.exists()) {
               await database().ref(ref + 'muscleGroups').set(null)
            }
         }
      } catch (e) {
         alert('Что-то пошло не так')
         console.error(e)
      }
   }
)