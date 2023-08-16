// eslint-disable-next-line no-unused-vars
import React from 'react';
import Card from '../Card/Card';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, setFirstRender, setLoading } from '../../redux/actions';
// import PacmanLoader from 'react-spinners/PacmanLoader';
import PageSelector from '../PageSelector/PageSelector';
import loadingGif from '../../img/loading.gif'

const Home = () => {
  const dispatch = useDispatch();
  var myVideogames = useSelector((state) => state.myVideogames);
  var { page, loading } = useSelector((state) => state.homeStatus);
  var { firstRender } = useSelector((state) => state.homeStatus);
  const [pageVideogames, setPageVideogames] = useState(
    myVideogames.slice(0, 15)
  );

  useEffect(() => {
    if(firstRender) {
    dispatch(setLoading(true));
    const fetchData = async () => {
      await dispatch(getVideogames());
      dispatch(setLoading(false));
    };
    fetchData();
    dispatch(setFirstRender(false))}
  }, [dispatch]);

  useEffect(() => {
    setPageVideogames(myVideogames.slice((page - 1) * 15, 15 * page));
  }, [myVideogames, page]);

  return (
    <>
      {loading ?(
        <div className={styles.loaderContainer}>
          <h2 className={styles.loaderText}>LOADING</h2>
          <img src={loadingGif} alt="loading" />
        </div>
      ) : (
        <div className={styles.container}>
          {myVideogames.length>0 && <PageSelector/>}
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
          {myVideogames.length>0 && <PageSelector/>}
        </div>
      )}
    </>
  );
};

export default Home;
