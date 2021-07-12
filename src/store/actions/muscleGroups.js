import {
   CHANGE_CHECKED,
   BIND_DATA
} from '../constants/actionTypes'

import muscleGroups from '../../assets/muscleGroups'
import axios from 'axios'

export const changeChecked = (id, checked) => ({
   type: CHANGE_CHECKED,
   payload: { 'id': id, 'checked': checked }
})

export const bindDataToState = (data, key = null) => ({
   type: BIND_DATA,
   payload: { 'data': data, 'key': key }
})

export const getData = (selectedDate) => (
   dispatch => {
      axios.get(`https://workout-diary-f4b5d-default-rtdb.europe-west1.firebasedatabase.app/date/${Date.parse(selectedDate)}/muscleGroups.json`).then(({ data }) => {
         if (!data) {
            dispatch(bindDataToState(muscleGroups))
         } else {
            const key = Object.keys(data)[0]
            dispatch(bindDataToState(data[`${key}`], key))
         }
      }).catch(e => {
         alert('Не удалось получить данные с сервера')
         console.error(e)
      })
   }
)