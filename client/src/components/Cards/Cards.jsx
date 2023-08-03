import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../../redux/actions';

const Cards = () => {
  const dispatch = useDispatch();
  var myVideogames = useSelector(state => state.myVideogames)
  
  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  // useEffect( () => {
  //   dispatch(orderAndFilterVideogames())
  //   console.log('useEffect');
  // },[myVideogames])

  return (
    <div className={styles.container}>
      {myVideogames.map((vg) => {
        return (
          <Card
            key={vg.id}
            id={vg.id}
            name={vg.name}
            rating={vg.rating}
            released={vg.released}
            genre={vg.genre}
            image={vg.image}
          />
        );
      })}
    </div>
  );
};

export default Cards;