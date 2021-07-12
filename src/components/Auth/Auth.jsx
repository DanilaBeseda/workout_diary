
import classes from './Auth.module.scss'

export const Auth = () => {

   return (
      <>
         <div className={classes.opacity}></div>
         <div className={classes.auth}>
            <input type="text" />
            <input type="password" />
         </div>
      </>
   )
}