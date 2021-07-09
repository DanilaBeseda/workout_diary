import { AddSet } from './AddSet/AddSet'

import classes from './Exercise.module.scss'

export const Exercise = ({ exercise }) => {

   return (
      <li className={classes.exercise}>
         <input className={classes.exerciseName} placeholder='Название упражнения' />

         <ul className={classes.exerciseList}>
            {exercise.sets.map((set, index) => (
               <li key={index} className={classes.exerciseItem}>{`${set.weight}кг x ${set.reps}`}</li>
            ))}
            <AddSet />
         </ul>

         <input className={classes.comment} placeholder={'Комментарий:'} />
      </li>
   )
}
