import { useSelector } from 'react-redux'

import { AddExercise } from './AddExercise/AddExercise'
import { Exercise } from './Exercise/Exercise'

import classes from './GymExercises.module.scss'

export const GymExercises = () => {

   const exercises = [
      {
         exerciseName: '',
         sets: [
            { weight: 0.0, reps: 0 },

         ],
         comment: ''
      },
   ]

   const selectedDate = useSelector(({ calendar }) => calendar.selectedDate)

   return (
      <div className={classes.gymExercises} style={{ height: '600px' }}>
         <span>{`${selectedDate.getDate()}-${selectedDate.getMonth()}-${selectedDate.getFullYear()}`}</span>
         <ul className={classes.exercises}>
            {exercises.map((exercise, index) => (
               <Exercise key={index} exercise={exercise} />
            ))}
         </ul>
         <AddExercise />
      </div>
   )
}