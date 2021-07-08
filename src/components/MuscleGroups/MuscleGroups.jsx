import { useState } from 'react'

import { Group } from './Group/Group'

import classes from './MuscleGroups.module.scss'

export const MuscleGroups = () => {
   const musсleGroups = ['бицепс', 'трицепс', 'грудь', 'спина', 'ноги', 'плечи', 'все группы мышц']
   const [toggle, setToggle] = useState(false)

   return (
      <div className={classes.musсleGroups}>
         <ul>
            {musсleGroups.map((group, index) => (
               <Group key={index} toggle={toggle} group={group} index={index} />
            ))}
            <button className={classes.btnConfirm} onClick={() => setToggle(prev => !prev)}>{toggle ? 'Подтвердить' : 'Выбрать мышечную группу'}</button>
         </ul>
      </div>
   )
}