import classes from './Exercise.module.scss'

export const Exercise = () => {

   return (
      <li className={classes.exercise}>
         <input className={classes.exerciseName} placeholder='Название упражнения' />

         <ul className={classes.exerciseList}>
            <li className={classes.exerciseItem}>2 x 150.0кг x 5</li>
            <li className={classes.exerciseItem}>2 x 150.0кг x 5</li>
            <li className={classes.exerciseItem}>2 x 150.0кг x 5</li>
         </ul>

         <input className={classes.comment} placeholder={'Комментарий:'} />
      </li>
   )
}
