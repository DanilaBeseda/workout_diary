import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Group } from './Group/Group'
import { getData, setData } from '../../store/actions/muscleGroups'

import classes from './MuscleGroups.module.scss'

export const MuscleGroups = () => {
   const [toggle, setToggle] = useState(false)
   const selectedDate = useSelector(({ calendar }) => calendar.selectedDate)
   const groups = useSelector(({ musсleGroups }) => musсleGroups.groups)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getData(selectedDate))
   }, [selectedDate, dispatch])

   function toggleHandler() {
      if (!toggle) { setToggle(true) } else {
         dispatch(setData(groups, selectedDate))
         setToggle(false)
      }
   }

   return (
      <div className={classes.musсleGroups}>
         <ul>
            {groups.map(group => (
               <Group key={group.id} toggle={toggle} group={group} />
            ))}
            <button className={classes.btnConfirm} onClick={toggleHandler}>{toggle ? 'Подтвердить' : 'Выбрать мышечную группу'}</button>
         </ul>
      </div>
   )
}