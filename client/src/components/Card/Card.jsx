/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { React, useEffect } from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../Helpers/PathRouters'

const Card = (props) => {
  const { id,name, genres, image} = props;

  return (
    <>
      <Link className={styles.link}to={`${ROUTES.DETAIL}${id}`}>
        <div className={styles.card}>
          <div className={styles.main}>
            <img className={styles.videogameImage} src={image} alt={name} />
            <div className={styles.name}>
              <h2>{name}</h2>
            </div>
            <hr />
            <div className={styles.videogameInfo}>
              <div className={styles.genres}>
                <p>{genres}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
