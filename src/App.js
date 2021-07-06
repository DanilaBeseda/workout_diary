import { Header } from './components/Header/Header'
import { Calendar } from './components/Calendar/Calendar'
import { MuscleGroups } from './components/MuscleGroups/MuscleGroups'
import { GymExercises } from './components/GymExercises/GymExercises'

import classes from './App.module.scss'

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <div className={classes.main}>
        <Calendar />
        <MuscleGroups />
      </div>
      <GymExercises />
    </div>
  );
}

export default App;
