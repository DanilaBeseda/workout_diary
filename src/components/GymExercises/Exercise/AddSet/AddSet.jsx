import classes from './AddSet.module.scss'

export const AddSet = () => {

   return (
      <button className={classes.addBtn}>
         <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1V15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8H15" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
      </button>
   )
}