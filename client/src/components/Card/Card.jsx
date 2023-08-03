/* eslint-disable react/prop-types */
import styles from './Card.module.css';
import { React } from 'react';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../Helpers/PathRouters'

const Card = (props) => {
  const { id,name, genre, image, rating, released } = props;
  const getRatingClassName = (rating) => {
    if (rating >= 4) return styles.ratingHigh;
    if (rating >= 3) return styles.ratingMedium;
    return styles.ratingLow;
  };
  return (
    <>
      <Link to={`${ROUTES.DETAIL}${id}`}>
        <div className={styles.card}>
          <div className={styles.main}>
            <img className={styles.videogameImage} src={image} alt={name} />
            <div className={styles.name}>
              <h2>{name}</h2>
            </div>
            <hr />
            <div className={styles.videogameInfo}>
              <div className={styles.rating}>
                <ins className={getRatingClassName(rating)}>&#x2605;</ins>
                <p className={getRatingClassName(rating)}>{rating}</p>
              </div>
              <div className={styles.releaseDate}>
                <ins>◷</ins>
                <p>{released}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
