import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AddSet } from './AddSet/AddSet'
import { deleteExercise, setExerciseData, deleteSet, getExercisesData, moveExercise } from '../../../store/actions/gymExercises'

import classes from './Exercise.module.scss'

export const Exercise = ({ exercise, exercises, arrayIndex, selectedDate, userUID }) => {
   const [isEdit, setIsEdit] = useState(false)
   const [name, setName] = useState(exercise.name)
   const [comment, setComment] = useState(exercise.comment)
   const dispatch = useDispatch()

   useEffect(() => {
      setName(exercise.name)
      setComment(exercise.comment)
   }, [exercises, exercise.name, exercise.comment])

   function editHandler() {
      setIsEdit(true)
   }

   function confirmHandler() {
      if (!name) {
         alert('Введите название упражнения!')
         return
      }
      dispatch(setExerciseData(exercise.id, exercise.sets, name, comment, selectedDate, userUID, arrayIndex))
      setIsEdit(false)
   }

   function cancelHandler() {
      dispatch(getExercisesData(selectedDate, userUID))
      setIsEdit(false)
   }

   function upArrowHandler() {
      dispatch(moveExercise(exercises, arrayIndex, userUID, selectedDate, true))
   }

   function downArrowHandler() {
      dispatch(moveExercise(exercises, arrayIndex, userUID, selectedDate))
   }


   function deleteExerciseHandler() {
      if (window.confirm('Вы жействительно хотите удалить упражнение?')) {
         dispatch(deleteExercise(selectedDate, userUID, exercises, arrayIndex))
      }
   }

   function deleteSetHandler(setId) {
      dispatch(deleteSet(setId, exercise.id))
   }

   return (
      <li className={classes.exercise}>
         <div>
            {isEdit
               ? <input type='text' className={classes.exerciseNameInput} onChange={(e) => setName(e.target.value)} placeholder='Название упражнения' value={name} />
               : <div className={classes.exerciseNameDiv}>{name}</div>
            }

            <ul className={classes.exerciseList}>
               {exercise.sets.map((set, index) => (
                  set.id !== 0 && <li key={index} className={classes.exerciseItem}>
                     {`${set.weight}кг x ${set.reps}`}

                     {<button className={classes.deleteBtn} style={isEdit ? { visibility: 'visible' } : { visibility: 'hidden' }} onClick={() => deleteSetHandler(set.id)}>
                        <svg width="10" height="10" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="black" /></svg>
                     </button>}
                  </li>
               ))}
               {isEdit && <AddSet exerciseId={exercise.id} />}
            </ul>

            {isEdit
               ? <input type='text' className={classes.commentInput} onChange={(e) => setComment(e.target.value)} placeholder='Комментарий:' value={comment} />
               : comment && <div className={classes.commentDiv}>{`Комментарий: ${comment}`}</div>
            }
         </div>
         {isEdit
            ? <div className={classes.center}>
               <button className={classes.confirm} onClick={confirmHandler}>
                  <svg width="30" height="30" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </button>

               <button className={classes.cancel} onClick={cancelHandler}>
                  <svg width="22" height="22" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M6.87215 5.5L10.7129 1.65926C10.8952 1.47731 10.9977 1.23039 10.9979 0.972832C10.9982 0.715276 10.8961 0.468178 10.7141 0.285898C10.5321 0.103617 10.2852 0.00108525 10.0277 0.000857792C9.77011 0.000630336 9.52302 0.102726 9.34074 0.284685L5.5 4.12542L1.65926 0.284685C1.47698 0.102404 1.22976 0 0.971974 0C0.714191 0 0.466965 0.102404 0.284685 0.284685C0.102404 0.466965 0 0.714191 0 0.971974C0 1.22976 0.102404 1.47698 0.284685 1.65926L4.12542 5.5L0.284685 9.34074C0.102404 9.52302 0 9.77024 0 10.028C0 10.2858 0.102404 10.533 0.284685 10.7153C0.466965 10.8976 0.714191 11 0.971974 11C1.22976 11 1.47698 10.8976 1.65926 10.7153L5.5 6.87458L9.34074 10.7153C9.52302 10.8976 9.77024 11 10.028 11C10.2858 11 10.533 10.8976 10.7153 10.7153C10.8976 10.533 11 10.2858 11 10.028C11 9.77024 10.8976 9.52302 10.7153 9.34074L6.87215 5.5Z" fill="black" />
                  </svg>
               </button>

               <div className={classes.arrows}>
                  <button className={classes.upArrow} onClick={upArrowHandler}>
                     <svg id="Layer" enableBackground="new 0 0 64 64" height="30" viewBox="0 0 64 64" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" /></svg>
                  </button>
                  <button className={classes.downArrow} onClick={downArrowHandler}>
                     <svg id="Layer" enableBackground="new 0 0 64 64" height="30" viewBox="0 0 64 64" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z" /></svg>
                  </button>
               </div>
            </div>
            : <div className={classes.center}>
               <button className={classes.edit} onClick={editHandler}>
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.638 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825V3.36825Z" fill="black" />
                  </svg>
               </button>

               <button className={classes.delete} onClick={deleteExerciseHandler}>
                  <svg enableBackground="new 0 0 510 510" height="25" viewBox="0 0 510 510" width="25" xmlns="http://www.w3.org/2000/svg"><g>
                     <path d="m240 240h30v165h-30z" /><path d="m180 240h30v165h-30z" /><path d="m300 240h30v165h-30z" /><path d="m450 60h-120v-15c0-24.813-20.186-45-45-45h-60c-24.814 0-45 20.187-45 45v15h-120v90h31.248l27.584 317.243c1.191 24.007 20.863 42.757 44.944 42.757h182.447c24.081 0 43.753-18.75 44.944-42.757l27.585-317.243h31.248zm-240-15c0-8.271 6.729-15 15-15h60c8.272 0 15 6.729 15 15v15h-90zm-120 45h330v30h-330zm271.211 375.624c-.336 8.061-6.919 14.376-14.987 14.376h-182.448c-8.068 0-14.651-6.314-14.987-14.376-29.348-337.707-27.341-314.616-27.429-315.624h267.28c-.08.905 1.788-20.569-27.429 315.624z" /></g>
                  </svg>
               </button>
            </div>
         }
      </li>
   )
}
