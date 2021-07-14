import { CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux'

import { changeChacked } from '../../../store/actions/muscleGroups'

import classes from './Group.module.scss'

export const Group = ({ toggle, group }) => {
   const dispatch = useDispatch()

   function checkboxHandler(e) {
      group.checked = e.target.checked
      dispatch(changeChacked(group))
   }

   return (
      <CSSTransition
         in={toggle || group.checked}
         timeout={400}
         classNames={
            !group.checked ? { ...classes } : {}
         }
         mountOnEnter
         unmountOnExit
      >
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
      </CSSTransition>
   )
}