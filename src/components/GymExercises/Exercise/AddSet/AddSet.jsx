import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { addSet } from '../../../../store/actions/gymExercises'

import classes from './AddSet.module.scss'

export const AddSet = ({ exercise }) => {
   const [isVisible, setIsVisible] = useState(false)
   const [weightInputValue, setWeightInputValue] = useState('')
   const [repsInputValue, setRepsInputValue] = useState('')
   const btnRef = useRef(null)
   const dispatch = useDispatch()

   function confirmHandler() {
      setIsVisible(false)
      dispatch(addSet({ weight: weightInputValue, reps: repsInputValue, id: exercise.sets.length + 1 }, exercise.id))
   }

   function weightInputHandler(e) {
      if (e.target.value.length > 6) {
         alert('Штангу погнёшь!')
         return
      }
      setWeightInputValue(e.target.value)
   }

   function repsInputHandler(e) {
      if (e.target.value.length > 3) {
         alert('Ты что марафонец? Тренируйся нормально!')
         return
      }
      setRepsInputValue(e.target.value)
   }

   function addCount(count) {
      if (Math.abs(count) === 10) {
         setWeightInputValue(prevState => count < 0 && +prevState === 0 ? prevState : `${+prevState + count}`)
      } else {
         setRepsInputValue(prevState => count < 0 && +prevState === 0 ? prevState : `${+prevState + count}`)
      }
   }

   return (
      <>
         <button ref={btnRef} className={classes.addBtn} onClick={() => setIsVisible(true)} style={isVisible ? { visibility: 'hidden' } : { visibility: 'visible' }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M8 1V15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M1 8H15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
         </button>
         {isVisible && <div className={classes.popup}>
            <div className={classes.weight}>
               <button className={classes.minus} onClick={() => addCount(-10)}>
                  <svg height="25" viewBox="0 0 480 480" width="25" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="240" x2="240" y1="480" y2="0"><stop offset="0" stopColor="#12c2e9" /><stop offset=".056" stopColor="#19bfe9" /><stop offset=".137" stopColor="#2db6ea" /><stop offset=".235" stopColor="#4da7ea" /><stop offset=".344" stopColor="#7993eb" /><stop offset=".462" stopColor="#b279ed" /><stop offset=".497" stopColor="#c471ed" /><stop offset="1" stopColor="#f64f59" /></linearGradient><path d="m360 240c0 4.417969-3.582031 8-8 8h-224c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h224c4.417969 0 8 3.582031 8 8zm120 0c0 132.546875-107.453125 240-240 240s-240-107.453125-240-240 107.453125-240 240-240c132.484375.148438 239.851562 107.515625 240 240zm-16 0c0-123.710938-100.289062-224-224-224s-224 100.289062-224 224 100.289062 224 224 224c123.652344-.140625 223.859375-100.347656 224-224zm0 0" fill="url(#linear0)" /></svg>
               </button>
               <input type='number' placeholder='Вес' onChange={weightInputHandler} value={weightInputValue} />
               <button className={classes.plus} onClick={() => addCount(10)}>
                  <svg height="25" viewBox="0 0 480 480" width="25" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="240" x2="240" y1="480" y2="0"><stop offset="0" stopColor="#12c2e9" /><stop offset=".056" stopColor="#19bfe9" /><stop offset=".137" stopColor="#2db6ea" /><stop offset=".235" stopColor="#4da7ea" /><stop offset=".344" stopColor="#7993eb" /><stop offset=".462" stopColor="#b279ed" /><stop offset=".497" stopColor="#c471ed" /><stop offset="1" stopColor="#f64f59" /></linearGradient><path d="m360 240c0 4.417969-3.582031 8-8 8h-104v104c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8v-104h-104c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h104v-104c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v104h104c4.417969 0 8 3.582031 8 8zm120 0c0 132.546875-107.453125 240-240 240s-240-107.453125-240-240 107.453125-240 240-240c132.484375.148438 239.851562 107.515625 240 240zm-16 0c0-123.710938-100.289062-224-224-224s-224 100.289062-224 224 100.289062 224 224 224c123.652344-.140625 223.859375-100.347656 224-224zm0 0" fill="url(#linear0)" /></svg>
               </button>
            </div>

            <div className={classes.reps}>
               <button className={classes.minus} onClick={() => addCount(-1)}>
                  <svg height="25" viewBox="0 0 480 480" width="25" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="240" x2="240" y1="480" y2="0"><stop offset="0" stopColor="#12c2e9" /><stop offset=".056" stopColor="#19bfe9" /><stop offset=".137" stopColor="#2db6ea" /><stop offset=".235" stopColor="#4da7ea" /><stop offset=".344" stopColor="#7993eb" /><stop offset=".462" stopColor="#b279ed" /><stop offset=".497" stopColor="#c471ed" /><stop offset="1" stopColor="#f64f59" /></linearGradient><path d="m360 240c0 4.417969-3.582031 8-8 8h-224c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h224c4.417969 0 8 3.582031 8 8zm120 0c0 132.546875-107.453125 240-240 240s-240-107.453125-240-240 107.453125-240 240-240c132.484375.148438 239.851562 107.515625 240 240zm-16 0c0-123.710938-100.289062-224-224-224s-224 100.289062-224 224 100.289062 224 224 224c123.652344-.140625 223.859375-100.347656 224-224zm0 0" fill="url(#linear0)" /></svg>
               </button>
               <input type='number' placeholder='Повторы' onChange={repsInputHandler} value={repsInputValue} />
               <button className={classes.plus} onClick={() => addCount(1)}>
                  <svg height="25" viewBox="0 0 480 480" width="25" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><linearGradient id="linear0" gradientUnits="userSpaceOnUse" x1="240" x2="240" y1="480" y2="0"><stop offset="0" stopColor="#12c2e9" /><stop offset=".056" stopColor="#19bfe9" /><stop offset=".137" stopColor="#2db6ea" /><stop offset=".235" stopColor="#4da7ea" /><stop offset=".344" stopColor="#7993eb" /><stop offset=".462" stopColor="#b279ed" /><stop offset=".497" stopColor="#c471ed" /><stop offset="1" stopColor="#f64f59" /></linearGradient><path d="m360 240c0 4.417969-3.582031 8-8 8h-104v104c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8v-104h-104c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h104v-104c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v104h104c4.417969 0 8 3.582031 8 8zm120 0c0 132.546875-107.453125 240-240 240s-240-107.453125-240-240 107.453125-240 240-240c132.484375.148438 239.851562 107.515625 240 240zm-16 0c0-123.710938-100.289062-224-224-224s-224 100.289062-224 224 100.289062 224 224 224c123.652344-.140625 223.859375-100.347656 224-224zm0 0" fill="url(#linear0)" /></svg>
               </button>
            </div>

            <div>
               <button className={classes.confirm} onClick={confirmHandler}>Готово</button>
               <button className={classes.cancel} onClick={() => setIsVisible(false)}>Отмена</button>
            </div>
         </div>
         }
      </>
   )
}