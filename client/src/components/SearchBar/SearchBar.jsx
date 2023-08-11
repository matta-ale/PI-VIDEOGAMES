import styles from './SearchBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions';
import { orderAndFilterVideogames } from '../../redux/actions';
import { ROUTES } from '../../Helpers/PathRouters';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [orderSelectValue, setOrderSelectValue] = useState('ascending');
  const [originSelectValue, setOriginSelectValue] = useState('all');
  const [genreSelectValue, setGenreSelectValue] = useState('all');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (search) => {
    dispatch(searchByName(search));
  };
  const handleOrderAndFilter = (event) => {
    if (
      event.target.name === 'ascending' ||
      event.target.name === 'descending'
    ) {
      const orderAux = event.target.name; //necesito poner un orderAux debido a que el state no cambia a tiempo y no le puedo pasar event.target.name (me tira error el vs code)
      dispatch(
        orderAndFilterVideogames({
          orderSelectValue: orderAux,
          originSelectValue,
          genreSelectValue,
        })
      );
    } else {
      const value = event.target.value;
      if (event.target.name === 'origin') {
        setOriginSelectValue(value);
        dispatch(
          orderAndFilterVideogames({
            orderSelectValue,
            originSelectValue: value,
            genreSelectValue,
          })
        );
      }
      if (event.target.name === 'genre') {
        setGenreSelectValue(value);
        dispatch(
          orderAndFilterVideogames({
            orderSelectValue,
            originSelectValue,
            genreSelectValue: value,
          })
        );
      }
    }
  };

  const setOrderAscending = () => {
    setOrderSelectValue('ascending');
    handleOrderAndFilter({ target: { name: 'ascending' } });
  };
  const setOrderDescending = () => {
    setOrderSelectValue('descending');
    handleOrderAndFilter({ target: { name: 'descending' } });
  };

  const handleClick = () => {
    navigate(ROUTES.FORM);
  };

  return (
    <div className={styles.container}>
      <div className={styles.createVideogameDiv}>
        <button className={styles.createVideogame} onClick={handleClick}>
          Create videogame
        </button>
      </div>
      <div className={styles.searchBarDiv}>
        <button className={styles.searchIcon} onClick={() => onSearch(search)}>&#128269;</button>
        <input
          type='search'
          placeholder='Search games'
          className={styles.inputBar}
          onChange={handleChange}
          value={search}
        />

      </div>
      <div className={styles.filterDiv}>
        <div className={styles.sortWrapper}>
          <span>Sort:</span>
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
        <div className={styles.selectWrapper}>
          <span>Filter:</span>
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
