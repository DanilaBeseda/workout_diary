import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import classes from './Group.module.scss'

export const Group = ({ toggle, group }) => {
   const [checked, setChecked] = useState(group.checked)

   function checkboxHandler(e) {
      setChecked(e.target.checked)
   }

   return (
      <CSSTransition
         in={checked || toggle}
         timeout={400}
         classNames={
            !checked ? { ...classes } : {}
         }
         unmountOnExit={!checked}
         mountOnEnter
      >
         <li className={classes.group}>
            <input
               id={group.id}
               type='checkbox'
               onChange={checkboxHandler}
               disabled={!toggle}
               checked={checked}
            />
            <label htmlFor={group.id}>{group.muscleGroupName}</label>
         </li>
      </ CSSTransition>
   )
}