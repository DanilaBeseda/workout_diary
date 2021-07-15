import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AddExercise } from './AddExercise/AddExercise'
import { Exercise } from './Exercise/Exercise'
import { getExercisesData } from '../../store/actions/gymExercises'

import classes from './GymExercises.module.scss'

export const GymExercises = () => {
   const { selectedDate } = useSelector(({ calendar }) => calendar)
   const { exercises } = useSelector(({ gymExercises }) => gymExercises)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getExercisesData(selectedDate))
   }, [selectedDate, dispatch])

   return (
      <div className={classes.gymExercises} style={{ height: '600px' }}>
         <span>{`${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`}</span>
         <ul className={classes.exercises}>
            {exercises.map((exercise, index) => (
               <Exercise key={index} exercise={exercise} selectedDate={selectedDate} />
            ))}
         </ul>
         <AddExercise />
      </div>
   )
}