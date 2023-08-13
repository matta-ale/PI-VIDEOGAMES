// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './PageSelector.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/actions';

const PageSelector = () => {
  const dispatch = useDispatch();
  const myVideogames = useSelector((state) => state.myVideogames);
  const page = useSelector((state) => state.homeStatus.page);

  const handlePageChange = (action) => {
    let maxPage = Math.ceil(myVideogames.length / 15);
    if (action === 'next' && maxPage !== page) {
      dispatch(setPage(page + 1));
    } else if (action === 'prev' && page !== 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handlePageNumber = (number) => {
    dispatch(setPage(number));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pageSelectorWrapper}>
          <button
            name='prev'
            className={styles.pageButton}
            onClick={() => handlePageChange('prev')}
          >
            &laquo; Prev
          </button>
          {Array.from(
            { length: Math.ceil(myVideogames.length / 15) },
            (_, i) => (
              <button
                key={i}
                name={i}
                className={styles.pageNumberButton}
                onClick={() => handlePageNumber(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            name='next'
            className={styles.pageButton}
            onClick={() => handlePageChange('next')}
          >
            Next &raquo;
          </button>
        </div>
        <span className={styles.pageSpan}>Page: {page}</span>
      </div>
    </>
  );
};

export default PageSelector;
