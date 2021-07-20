import {
   LOGIN_VALIDATION,
   PASSWORD_VALIDATION,
   CONFIRM_PASSWORD_VALIDATION,
   RESET,
   SET_VISIBILITY,
   SET_USER
} from '../constants/actionTypes'

import firebase from 'firebase/app'
import 'firebase/auth'

export const loginValidation = target => ({
   type: LOGIN_VALIDATION,
   payload: target
})

export const passwordValidation = target => ({
   type: PASSWORD_VALIDATION,
   payload: target
})

export const confirmPasswordValidation = target => ({
   type: CONFIRM_PASSWORD_VALIDATION,
   payload: target
})

export const reset = () => ({
   type: RESET
})

export const setVisibilityPopup = (visibility) => ({
   type: SET_VISIBILITY,
   payload: visibility
})

export const setUser = (userName, userUID) => ({
   type: SET_USER,
   payload: { userName, userUID }
})

export const login = (isRegistration, validated, login, password) => (
   dispatch => {
      if (isRegistration) {
         if (validated.every(item => item)) {
            firebase.auth().createUserWithEmailAndPassword(login, password)
               .then((userCredential) => {
                  dispatch(reset())
                  dispatch(setUser(userCredential.user.email.slice(0, userCredential.user.email.indexOf('@')), userCredential.user.uid))
                  dispatch(setVisibilityPopup(false))
               })
               .catch((err) => {
                  alert(err.message)
                  console.error(err)
               })
         } else {
            alert('Не все поля заполнены или заполнены корректно')
         }
      } else {
         if (validated[0] && validated[1]) {
            firebase.auth().signInWithEmailAndPassword(login, password)
               .then((userCredential) => {
                  dispatch(reset())
                  dispatch(setUser(userCredential.user.email.slice(0, userCredential.user.email.indexOf('@')), userCredential.user.uid))
                  dispatch(setVisibilityPopup(false))
               })
               .catch((err) => {
                  alert(err.message)
                  console.error(err)
               })
         } else {
            alert('Не все поля заполнены или заполнены корректно')
         }
      }
   }
)