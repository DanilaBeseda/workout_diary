import { useState } from 'react'

import classes from './Group.module.scss'

export const Group = ({ toggle, group }) => {
   const [checked, setChecked] = useState(group.checked)

   function checkboxHandler(e) {
      setChecked(e.target.checked)
      group.checked = e.target.checked
   }

   return (
      <li className={classes.group} >
         <input
            id={group.id}
            type='checkbox'
            onChange={checkboxHandler}
            disabled={!toggle}
            checked={group.checked}
         />
         <label htmlFor={group.id}>{group.muscleGroupName}</label>
      </li >
   )
}