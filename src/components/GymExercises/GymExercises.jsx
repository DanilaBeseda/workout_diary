import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AddExercise } from './AddExercise/AddExercise'
import { Exercise } from './Exercise/Exercise'
import { getExercisesData } from '../../store/actions/gymExercises'

import classes from './GymExercises.module.scss'

export const GymExercises = () => {
   const { selectedDate } = useSelector(({ calendar }) => calendar)
   const { exercises } = useSelector(({ gymExercises }) => gymExercises)
   const { userUID } = useSelector(({ auth }) => auth)
   const dispatch = useDispatch()

   useEffect(() => {
      if (userUID) {
         dispatch(getExercisesData(selectedDate, userUID))
      }
   }, [selectedDate, dispatch, userUID])

   return (
      <div className={classes.gymExercises}>
         <span>{`${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`}</span>
         <ul className={classes.exercises}>
            {Object.entries(exercises).map(exercise => (
               <Exercise
                  key={exercise[0]}
                  exercise={exercise[1]}
                  exerciseKey={exercise[0]}
                  selectedDate={selectedDate}
                  userUID={userUID} />
            ))}
         </ul>
         <AddExercise selectedDate={selectedDate} userUID={userUID} />
      </div>
   )
}