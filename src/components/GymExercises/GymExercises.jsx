import classes from './GymExercises.module.scss'

export const GymExercises = () => {
   return (
      <div className={classes.gymExercises} style={{ height: '600px' }}>
         <span>07-07-2021</span>
         <ul className={classes.exercises}>
            <li className={classes.exercise}>

               <p className={classes.exerciseName}>
                  Название упражнения
               </p>

               <ul className={classes.exerciseList}>
                  <li className={classes.exerciseItem}>2 x 150.0кг x 5</li>
                  <li className={classes.exerciseItem}>2 x 150.0кг x 5</li>
                  <li className={classes.exerciseItem}>2 x 150.0кг x 5</li>
               </ul>

               <p className={classes.comment}>Комментарии: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, tempore.</p>

            </li>
         </ul>
      </div>
   )
}