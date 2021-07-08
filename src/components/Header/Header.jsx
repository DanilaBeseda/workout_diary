import classes from './Header.module.scss'

export const Header = () => (
   <header className={classes.header}>
      <div className={classes.container}>
         <h3>Тренировки</h3>
         <button>Вход</button>
      </div>
   </header>
)