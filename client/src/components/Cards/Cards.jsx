// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../redux/actions';

const Cards = () => {
  const dispatch = useDispatch();
  var myVideogames = useSelector((state) => state.myVideogames);
  const [page, setPage] = useState(1);
  const [pageVideogames, setPageVideogames] = useState(
    myVideogames.slice(0, 15)
  );

  useEffect(() => {
    dispatch(getVideogames());
  }, []);

  useEffect(() => {
    setPageVideogames(myVideogames.slice((page - 1) * 15, 15 * page));
  }, [myVideogames, page]);

  useEffect(() => {
    setPage(1);
  }, [myVideogames]);

  const handlePageChange = (action) => {
    let maxPage = Math.ceil(myVideogames.length / 15);
    if (action === 'next' && maxPage !== page) {
      setPage(page + 1);
    } else if (action === 'prev' && page !== 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pageSelectorWrapper}>
          <button name='prev' className={styles.pageButton} onClick={() => handlePageChange('prev')}>
          &laquo; Prev
          </button>
          <span className={styles.pageSpan}>Page: {page}</span>
          <button name='next' className={styles.pageButton} onClick={() => handlePageChange('next')}>
          Next &raquo;
          </button>
        </div>
        <div className={styles.cardsContainerWrapper}>
          <div className={styles.cardsContainer}>
            {pageVideogames.map((vg) => {
              return (
                <Card
                  key={vg.id}
                  id={vg.id}
                  name={vg.name}
                  rating={vg.rating}
                  released={vg.released}
                  genres={vg.Genres}
                  image={vg.image}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
