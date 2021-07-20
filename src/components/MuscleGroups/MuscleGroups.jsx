import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Group } from './Group/Group'
import { getGroupsData, setGroupsData } from '../../store/actions/muscleGroups'

import classes from './MuscleGroups.module.scss'

export const MuscleGroups = () => {
   const [toggle, setToggle] = useState(false)
   const { selectedDate } = useSelector(({ calendar }) => calendar)
   const { groups } = useSelector(({ musсleGroups }) => musсleGroups)
   const { userUID } = useSelector(({ auth }) => auth)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getGroupsData(selectedDate, userUID))
      setToggle(false)
   }, [selectedDate, dispatch, userUID])

   function toggleHandler() {
      if (!toggle) { setToggle(true) } else {
         if (userUID) {
            dispatch(setGroupsData(groups, selectedDate, userUID))
            setToggle(false)
         } else {
            alert('Войдите в аккаунт')
         }
      }
   }

   return (
      <div className={classes.musсleGroups}>
         <ul>
            {groups.map(group => {
               return (
                  <Group key={group.id} toggle={toggle} group={group} />
               )
            })}
            <button className={classes.btnConfirm} onClick={toggleHandler}>{toggle ? 'Подтвердить' : 'Выбрать мышечную группу'}</button>
         </ul>
      </div>
   )
}