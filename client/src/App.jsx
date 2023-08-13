import './App.css';
import {ROUTES} from './Helpers/PathRouters'
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {(location.pathname !== ROUTES.LANDINGPAGE) && (
        <Navbar/>
      )}
      <Routes>
        <Route
          path={ROUTES.LANDINGPAGE}
          element={<LandingPage/>}
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
