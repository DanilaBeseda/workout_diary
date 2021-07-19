import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginValidation, passwordValidation, confirmPasswordValidation, reset } from '../../store/actions/auth'

import classes from './Auth.module.scss'

export const Auth = () => {
   const { loginInputValue, passwordInputValue, confirmPasswordInputValue } = useSelector(({ auth }) => auth)
   const [isRegistration, setIsRegistration] = useState(false)
   const dispatch = useDispatch()

   function loginInputHandler(e) {
      dispatch(loginValidation(e.target))
   }

   function passwordInputHandler(e) {
      dispatch(passwordValidation(e.target))
   }

   function confirmPasswordInputHandler(e) {
      dispatch(confirmPasswordValidation(e.target))
   }

   function resetHandler() {
      dispatch(reset())
      setIsRegistration(prevState => !prevState)
   }

   function loginHandler() {
      if (!isRegistration) {
         //dispatch(...)
      } else {
         //passwordInputValue === confirmPasswordInputValue ? /* dispatch(...) */ : alert('Пароли не совпдают')
      }
   }

   return (
      <>
         <div className={classes.opacity}></div>
         <div className={classes.auth}>
            <p>{isRegistration ? 'Зарегистрируйтесь' : 'Войдите в аккаунт'}</p>
            <input
               type="email"
               placeholder='email'
               onChange={loginInputHandler}
               value={loginInputValue}
            />
            <input
               type="password"
               placeholder='пароль'
               onChange={passwordInputHandler}
               value={passwordInputValue}
            />
            {isRegistration && <input
               type="password"
               placeholder='подтвердите пароль'
               onChange={confirmPasswordInputHandler}
               value={confirmPasswordInputValue}
            />}

            <button
               className={classes.login}
               onClick={loginHandler}
            >
               {isRegistration ? 'Зарегистрироваться' : 'Войти'}
            </button>

            <span onClick={resetHandler}>{isRegistration ? 'У вас уже есть аккаунт?' : 'Зарeгистрироваться'}</span>
         </div>
      </>
   )
}