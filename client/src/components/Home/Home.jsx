// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from '../Card/Card';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, setLoading } from '../../redux/actions';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PageSelector from '../PageSelector/PageSelector';

const Home = () => {
  const dispatch = useDispatch();
  var myVideogames = useSelector((state) => state.myVideogames);
  var loading = useSelector((state) => state.loading);
  var { page } = useSelector((state) => state.homeStatus);

  const [pageVideogames, setPageVideogames] = useState(
    myVideogames.slice(0, 15)
  );

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      await dispatch(getVideogames());
      dispatch(setLoading(false));
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setPageVideogames(myVideogames.slice((page - 1) * 15, 15 * page));
  }, [myVideogames, page]);

  // const handlePageChange = (action) => {
  //   let maxPage = Math.ceil(myVideogames.length / 15);
  //   if (action === 'next' && maxPage !== page) {
  //     dispatch(setPage(page + 1));
  //   } else if (action === 'prev' && page !== 1) {
  //     dispatch(setPage(page - 1));
  //   }
  // };
  // const handlePageNumber = (number) => {
  //     dispatch(setPage(number));
  //   };

  return (
    <>
      {loading ? (
        <div className={styles.loaderContainer}>
          <h1 className={styles.loaderText}>LOADING...</h1>
          <PacmanLoader
            color='rgba(158, 202, 237,1)'
            size={50}
            loading={loading}
          />
        </div>
      ) : (
        <div className={styles.container}>
          {/* <div className={styles.pageSelectorWrapper}>
            <button
              name='prev'
              className={styles.pageButton}
              onClick={() => handlePageChange('prev')}
            >
              &laquo; Prev
            </button>
            {Array.from({ length: Math.ceil(myVideogames.length / 15) }, (_, i) => (
              <button
                key={i}
                name={i}
                className={styles.pageNumberButton}
                onClick={() => handlePageNumber(i+1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              name='next'
              className={styles.pageButton}
              onClick={() => handlePageChange('next')}
            >
              Next &raquo;
            </button>
          </div>
            <span className={styles.pageSpan}>Page: {page}</span> */}
          <PageSelector/>
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
          <PageSelector/>
        </div>
      )}
    </>
  );
};

export default Home;
