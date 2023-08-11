// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Detail.module.css';
import { detailDataFormater } from '../../Helpers/detailDataFormater';
import DOMPurify from 'dompurify';

export default function Detail() {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    console.log(id);
    axios(`/videogames/${id}`).then(({ data }) => {
      if (data.name) {
        data = detailDataFormater(data);
        setVideogame(data);
      } else {
        window.alert('No videogames with that ID');
      }
    });
    return setVideogame({}); // the cleanup function is used to reset the component state to an empty object {} when the component unmounts or before the next effect runs, so that the component is ready to handle a new id prop and avoids any potential issues with stale or incorrect data.
  }, [id]);
  const sanitizedDescription = DOMPurify.sanitize(videogame?.description);

  const getRatingClassName = (rating) => {
    if (rating >= 4) return styles.ratingHigh;
    if (rating >= 3) return styles.ratingMedium;
    return styles.ratingLow;
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftRightWrapper}>
        <div className={styles.leftSubContainer}>
          <div className={styles.nameDiv}>
            <h1 className={styles.nameText}>{videogame?.name}</h1>
          </div>
          <img
            className={styles.detailImage}
            src={videogame?.image}
            alt='videogame'
          />
        </div>
        <div className={styles.rightSubContainer}>
          <div className={styles.infoDiv}>
            <div className={styles.rating}>
              <span>Rating: </span>
              <ins className={getRatingClassName(videogame?.rating)}>
                &#x2605;
              </ins>
              <p className={getRatingClassName(videogame?.rating)}>
                {videogame?.rating}
              </p>
            </div>
            <h4 className={styles.h2Text}>
              <span>Released: {videogame?.released}</span>
            </h4>
          </div>
          <br />
          <h4 className={styles.h2Text}>
            <div className={styles.descriptionContainer}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              ></div>
            </div>
          </h4>
          <br />
          <h4 className={styles.h2Text}>
            <span>Genres: {videogame.Genres}</span>
          </h4>
          <br />
          <h4 className={styles.h2Text}>
            <span>Platforms: {videogame?.platforms}</span>
          </h4>
        </div>
      </div>
    </div>
  );
}
