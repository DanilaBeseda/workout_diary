import { Header } from './components/Header/Header'
import { Calendar } from './components/Calendar/Calendar'
import { MuscleGroups } from './components/MuscleGroups/MuscleGroups'
import { GymExercises } from './components/GymExercises/GymExercises'
import { Auth } from './components/Auth/Auth'

import classes from './App.module.scss'

function App() {
  return (
    <div className={classes.wrapper}>
      <Auth />
      <div className={classes.app}>
        <Header />
        <div className={classes.center}>
          <div className={classes.main}>
            <div className={classes.row}>
              <Calendar />
              <MuscleGroups />
            </div>
            <GymExercises />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
