import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Group } from './Group/Group'
import { getData, changeChecked } from '../../store/actions/muscleGroups'

import classes from './MuscleGroups.module.scss'

export const MuscleGroups = () => {
   const [toggle, setToggle] = useState(false)
   const ulRef = useRef(null)
   const selectedDate = useSelector(({ calendar }) => calendar.selectedDate)
   const { groups, key } = useSelector(({ musсleGroups }) => musсleGroups)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getData(selectedDate))
   }, [selectedDate, dispatch])

   return (
      <div className={classes.musсleGroups}>
         <ul ref={ulRef}>
            {groups.map(group => (
               <Group key={group.id} toggle={toggle} group={group} />
            ))}
            <button className={classes.btnConfirm} onClick={() => setToggle(prev => !prev)}>{toggle ? 'Подтвердить' : 'Выбрать мышечную группу'}</button>
         </ul>
      </div>
   )
}