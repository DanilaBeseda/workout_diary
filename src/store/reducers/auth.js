import {
   LOGIN_VALIDATION,
   PASSWORD_VALIDATION,
   CONFIRM_PASSWORD_VALIDATION,
   RESET,
   SET_VISIBILITY,
   SET_USER
} from '../constants/actionTypes'

const initialState = {
   loginInputValue: '',
   passwordInputValue: '',
   confirmPasswordInputValue: '',
   validated: [false, false, false],
   isVisiblePopup: false,
   userName: '',
   userUID: null
}

export const auth = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_VALIDATION: {
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         let cloneValidated = state.validated

         if (re.test(action.payload.value.toLowerCase())) {
            action.payload.style.border = '1px solid green'
            cloneValidated[0] = true
         } else {
            action.payload.style.border = '1px solid red'
            cloneValidated[0] = false
         }

         return {
            ...state, loginInputValue: action.payload.value, validated: cloneValidated
         }
      }
      case PASSWORD_VALIDATION: {
         let value = action.payload.value
         let cloneValidated = state.validated

         if (value.includes(' ')) {
            alert('Пароль должен быть без пробелов')
            value = value.trimEnd()
         }

         if (value.length < 6) {
            action.payload.style.border = '1px solid red'
            cloneValidated[1] = false
         } else {
            action.payload.style.border = '1px solid green'
            cloneValidated[1] = true
         }

         return {
            ...state, passwordInputValue: value, validated: cloneValidated
         }
      }
      case CONFIRM_PASSWORD_VALIDATION: {
         let value = action.payload.value
         let cloneValidated = state.validated

         if (value.includes(' ')) {
            alert('Пароль должен быть без пробелов')
            value = value.trimEnd()
         }

         if (value && value === state.passwordInputValue) {
            action.payload.style.border = '1px solid green'
            cloneValidated[2] = true
         } else {
            action.payload.style.border = '1px solid red'
            cloneValidated[2] = false
         }

         return {
            ...state, confirmPasswordInputValue: value, validated: cloneValidated
         }
      }
      case RESET:
         return {
            ...state, loginInputValue: '', passwordInputValue: '', confirmPasswordInputValue: '', validate: [false, false, false]
         }
      case SET_VISIBILITY:
         return {
            ...state, isVisiblePopup: action.payload
         }
      case SET_USER:
         console.log(action.payload.userUID)
         return {
            ...state, userName: action.payload.userName, userUID: action.payload.userUID
         }
      default:
         return state
   }
}