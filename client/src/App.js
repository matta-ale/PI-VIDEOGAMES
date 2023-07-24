import './App.css';
import Home from './components/Home/Home'
import {ROUTES} from './Helpers/PathRouters'
import {Routes, Route} from 'react-router-dom';
import Landpage from './components/Landpage/Landpage';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route
          path={ROUTES.LANDPAGE}
          element={<Landpage/>}
        ></Route>
        <Route
          path={ROUTES.HOME}
          element={<Home/>}//{<Cards characters={characters} onClose={onCLose} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
