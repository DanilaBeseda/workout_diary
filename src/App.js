import { Header } from './components/Header/Header'
import { Calendar } from './components/Calendar/Calendar'

import classes from './App.module.scss'

function App() {
  return (
    <div className={classes.app}>
      <Header />
      <Calendar />
    </div>
  );
}

export default App;
