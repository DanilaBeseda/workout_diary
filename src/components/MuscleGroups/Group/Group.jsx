import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import classes from './Group.module.scss'

export const Group = ({ toggle, group, index }) => {
   const [checked, setChecked] = useState(false)

   function checkboxHandler(e) {
      setChecked(e.target.checked)
   }

   return (
      <CSSTransition
         in={toggle}
         timeout={400}
         classNames={
            !checked ? { ...classes } : {}
         }
         unmountOnExit={!checked}
         mountOnEnter
      >
         <li className={classes.group}>
            <input id={index} type='checkbox' onChange={checkboxHandler} disabled={!toggle} />
            <label htmlFor={index}>{group}</label>
         </li>
      </ CSSTransition>
   )
}