import './App.css';
import {ROUTES} from './Helpers/PathRouters'
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home'
import Landpage from './components/Landpage/Landpage';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

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
        <Route
          path={ROUTES.DETAIL + ':id'}
          element={<Detail/>}
        ></Route>
        <Route
          path={ROUTES.FORM}
          element={<Form/>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
