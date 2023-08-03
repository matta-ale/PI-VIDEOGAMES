// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Detail.module.css';
import { detailDataFormater } from '../../Helpers/detailDataFormater';

export default function Detail() {
  const { id } = useParams();
  const [videogame, setVideogame] = useState({});
  
  
  useEffect(() => {
    console.log(id);
    axios(`/videogames/${id}`).then(
      ({ data }) => {
        console.log(data);
        if (data.name) {
          data = detailDataFormater(data)
          setVideogame(data);
        } else {
          window.alert('No videogames with that ID');
        }
      }
    );
    return setVideogame({}); // the cleanup function is used to reset the component state to an empty object {} when the component unmounts or before the next effect runs, so that the component is ready to handle a new id prop and avoids any potential issues with stale or incorrect data.
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailSubContainer}>
        <div className={styles.nameDiv}>
          <h2 className={styles.nameText}>{videogame?.name}</h2>
        </div>
        <div className={styles.dataAndImageContainer}>  
          <div className={styles.dataContainer}>
            <div className={styles.dataSubContainer}>
              <div className={styles.dataTextContainer}>
                <h2 className={styles.h2Text}>
                  <span>Id: {videogame?.id}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Platforms: {videogame?.platforms}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Description: {videogame?.description}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Release date: {videogame.released}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Rating: {videogame.rating}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Genres: {videogame.Genres}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.detailImage}
              src={videogame?.image}
              alt='videogame'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
