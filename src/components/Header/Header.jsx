import { useSelector, useDispatch } from 'react-redux'

import { setVisibilityPopup } from '../../store/actions/auth'

import classes from './Header.module.scss'

export const Header = () => {
   const { userName } = useSelector(({ auth }) => auth)
   const dispatch = useDispatch()

   function showLoginPopup() {
      dispatch(setVisibilityPopup(true))
   }

   return (
      <header className={classes.header}>
         <div className={classes.container}>
            <h3>Тренировки</h3>
            <button onClick={showLoginPopup}>{userName ? userName : 'Вход'}</button>
         </div>
      </header>
   )
}