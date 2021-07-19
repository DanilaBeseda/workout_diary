import {
   LOGIN_VALIDATION,
   PASSWORD_VALIDATION,
   CONFIRM_PASSWORD_VALIDATION,
   RESET
} from '../constants/actionTypes'

const initialState = {
   loginInputValue: '',
   passwordInputValue: '',
   confirmPasswordInputValue: ''
}

export const auth = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_VALIDATION: {
         const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

         if (re.test(action.payload.value.toLowerCase())) {
            action.payload.style.border = '1px solid green'
         } else {
            action.payload.style.border = '1px solid red'
         }

         return {
            ...state, loginInputValue: action.payload.value
         }
      }
      case PASSWORD_VALIDATION: {
         let value = action.payload.value

         if (value.includes(' ')) {
            alert('Пароль должен быть без пробелов')
            value = value.trimEnd()
         }

         if (value.length < 6) {
            action.payload.style.border = '1px solid red'
         } else {
            action.payload.style.border = '1px solid green'
         }

         return {
            ...state, passwordInputValue: value
         }
      }
      case CONFIRM_PASSWORD_VALIDATION: {
         let value = action.payload.value

         if (value.includes(' ')) {
            alert('Пароль должен быть без пробелов')
            value = value.trimEnd()
         }

         if (value === state.passwordInputValue) {
            action.payload.style.border = '1px solid green'
         } else {
            action.payload.style.border = '1px solid red'
         }

         return {
            ...state, confirmPasswordInputValue: value
         }
      }
      case RESET: {
         return {
            ...state, loginInputValue: '', passwordInputValue: '', confirmPasswordInputValue: ''
         }
      }
      default:
         return state
   }
}