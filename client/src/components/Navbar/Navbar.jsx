import styles from './Navbar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchByName, setPage } from '../../redux/actions';
import {
  orderAndFilterVideogames,
  setOrder,
  setOrigin,
  setGenre,
  getVideogames,
} from '../../redux/actions';
import { ROUTES } from '../../Helpers/PathRouters';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [showingSearch, setShowingSearch] = useState(false);

  var { order, originFilter, genreFilter } = useSelector(
    (state) => state.homeStatus
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (search) => {
    showingSearch ? dispatch(getVideogames()) : dispatch(searchByName(search));
    setPage(1)
    setShowingSearch(!showingSearch);
  };
  const handleOrderAndFilter = (event) => {
    if (
      event.target.name === 'ascending' ||
      event.target.name === 'descending'
    ) {
      dispatch(setOrder(event.target.name));
      const orderAux = event.target.name; //necesito poner un orderAux debido a que el state no cambia a tiempo y no le puedo pasar event.target.name (me tira error el vs code)
      dispatch(
        orderAndFilterVideogames({
          orderSelectValue: orderAux,
          originSelectValue: originFilter,
          genreSelectValue: genreFilter,
        })
      );
    } else {
      const value = event.target.value;
      if (event.target.name === 'origin') {
        setOrigin(value);
        dispatch(
          orderAndFilterVideogames({
            orderSelectValue: order,
            originSelectValue: value,
            genreSelectValue: genreFilter,
          })
        );
        dispatch(setPage(1));
      }
      if (event.target.name === 'genre') {
        setGenre(value);
        dispatch(
          orderAndFilterVideogames({
            orderSelectValue: order,
            originSelectValue: originFilter,
            genreSelectValue: value,
          })
        );
        dispatch(setPage(1));
      }
    }
  };

  const setOrderAscending = () => {
    setOrder('ascending');
    handleOrderAndFilter({ target: { name: 'ascending' } });
  };
  const setOrderDescending = () => {
    setOrder('descending');
    handleOrderAndFilter({ target: { name: 'descending' } });
  };

  const handleCreateVideogameClick = () => {
    navigate(ROUTES.FORM);
  };

  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.part1}>
        <div className={styles.linksDiv}>
          <div className={styles.homeButtonDiv}>
            <button className={styles.homeButton} onClick={handleHomeClick}>
              HOME
            </button>
          </div>
          <div className={styles.createVideogameDiv}>
            <button
              className={styles.createVideogame}
              onClick={handleCreateVideogameClick}
            >
              CREATE VIDEOGAME
            </button>
          </div>
        </div>
        <div className={styles.searchBarDiv}>
          <button
            className={styles.searchIcon}
            onClick={() => onSearch(search)}
          >
            {showingSearch ? '❌' : '🔍'}
          </button>
          <input
            type='search'
            placeholder='Search games'
            className={styles.inputBar}
            onChange={handleChange}
            value={search}
          ></input>
        </div>
      </div>
      <div className={styles.part2}>
        <div className={styles.filterDiv}>
          <div className={styles.sortWrapper}>
            <span>SORT:</span>
            <div className={styles.sortButtons}>
              <button
                className={styles.sortButton1}
                name='ascending'
                onClick={setOrderAscending}
              >
                &#x25b4; Asc
              </button>
              <button
                className={styles.sortButton2}
                name='descending'
                onClick={setOrderDescending}
              >
                &#x25be; Des
              </button>
            </div>
          </div>
        </div>
        <div className={styles.selectWrapper}>
          <span>FILTER:</span>
          <div className={styles.selectButtons}>
            <select
              name='origin'
              className={styles.selectButton1}
              onChange={handleOrderAndFilter}
            >
              <option value='all'>All</option>
              <option value='api'>API</option>
              <option value='database'>Database</option>
            </select>
            <select
              name='genre'
              className={styles.selectButton2}
              onChange={handleOrderAndFilter}
            >
              <option value='all'>All</option>
              <option value='4'>Action</option>
              <option value='3'>Adventure</option>
              <option value='11'>Arcade</option>
              <option value='28'>Board Games</option>
              <option value='17'>Card</option>
              <option value='40'>Casual</option>
              <option value='34'>Educational</option>
              <option value='15'>Family</option>
              <option value='6'>Fighting</option>
              <option value='51'>Indie</option>
              <option value='59'>Massively Multiplayer</option>
              <option value='83'>Platformer</option>
              <option value='7'>Puzzle</option>
              <option value='1'>Racing</option>
              <option value='5'>RPG</option>
              <option value='2'>Shooter</option>
              <option value='14'>Simulation</option>
              <option value='15'>Sports</option>
              <option value='10'>Strategy</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
