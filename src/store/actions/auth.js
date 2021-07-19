import {
   LOGIN_VALIDATION,
   PASSWORD_VALIDATION,
   CONFIRM_PASSWORD_VALIDATION,
   RESET
} from '../constants/actionTypes'

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