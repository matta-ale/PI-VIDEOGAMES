// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import styles from './Form.module.css';
import { validation } from './validation';
import { genresOptions } from '../../Helpers/genresOptions';
import axios from 'axios';
import { platformsOptions } from '../../Helpers/platformsOptions';

const Form = () => {
  const [videogameData, setVideogameData] = useState({
    name: '',
    description: '',
    platforms: [],
    image: '',
    released: '',
    rating: '',
    genreIds: [],
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    platforms: '',
    image: '',
    released: '',
    rating: '',
    genreIds: '',
  });
  const handleChange = (event) => {
    const property = event.target.name;
    setVideogameData({ ...videogameData, [property]: event.target.value });
    setErrors(validation({ ...videogameData, [property]: event.target.value }));
  };

  //este handler sincroniza los checkbox con el videogameData
  const handleGendersOptions = (genre) => {
    setVideogameData((prevState) => {
      //useState puede tomar una callback como argumento, donde el argumento input de la misma es el estado previo
      const updatedGenreIds = prevState.genreIds.includes(genre.id)
        ? prevState.genreIds.filter((g) => g !== genre.id)
        : [...prevState.genreIds, genre.id];
        setErrors(validation({...videogameData,genreIds: updatedGenreIds}))
      return { ...prevState, genreIds: updatedGenreIds };
    });
  };

  const handlePlatformsOptions = (platform) => {
    setVideogameData((prevState) => {
      //useState puede tomar una callback como argumento, donde el argumento input de la misma es el estado previo
      const updatedPlatforms = prevState.platforms.includes(platform)
        ? prevState.platforms.filter((p) => p !== platform)
        : [...prevState.platforms, platform];
        setErrors(validation({...videogameData,platforms: updatedPlatforms}))
      return { ...prevState, platforms: updatedPlatforms };
    });
  };
  const createVideogame = async (videogameData, errors) => {
    
    try {
      if (errors=={
        name: '',
        description: '',
        platforms: '',
        image: '',
        released: '',
        rating: '',
        genreIds: '',
      })
      {await axios.post('/videogames', videogameData);
      window.alert('Videogame created');}
      else {
        window.alert('Please complete all the data')
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createVideogame(videogameData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.formDiv}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <h1>Enter new videogame data:</h1>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.leftContainer}>
            <label htmlFor='name'>Name: </label>
            <input
              className={styles.input}
              type='text'
              name='name'
              placeholder='Type videogame name...'
              onChange={handleChange}
              value={videogameData ? videogameData.name : ''}
            />
            <p className={styles.warning}>{errors.name} </p>
            <br />
            <label htmlFor='description'>Description: </label>
            <textarea
              className={styles.input}
              name='description'
              placeholder='Type a description of the videogame...'
              onChange={handleChange}
              value={videogameData ? videogameData.description : ''}
            />
            <p className={styles.warning}>{errors.description}</p>
            <br />
            <label htmlFor='image'>Image: </label>
            <input
              className={styles.input}
              type='text'
              name='image'
              placeholder='Type URL of an image of the videogame...'
              onChange={handleChange}
              value={videogameData ? videogameData.image : ''}
            />
            <p className={styles.warning}>{errors.image}</p>
            <br />
            <div className={styles.dateAndRatingDiv}>
              <div className={styles.dateAndRatingSubDiv}>
                <label htmlFor='released'>Release date: </label>
                <input
                  className={styles.input}
                  type='date'
                  name='released'
                  onChange={handleChange}
                  value={videogameData ? videogameData.released : ''}
                />
                <p className={styles.warning}>{errors.released}</p>
              </div>
              <br />
              <div className={styles.dateAndRatingSubDiv}>
                <label htmlFor='rating'>Rating: </label>
                <input
                  className={`${styles.input} ${styles.rating}`}
                  type='number'
                  step='0.1'
                  name='rating'
                  placeholder='1.0 - 5.0'
                  onChange={handleChange}
                  value={videogameData ? videogameData.rating : ''}
                />
                <p className={styles.warning}>{errors.rating}</p>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.rightContainer}>
            <label>Platforms: </label>
            <div className={styles.checkboxGroup}>
              {platformsOptions.map((platform) => (
                <label key={platform} className={styles.checkbox}>
                  <input
                    type='checkbox'
                    name={platform}
                    value={platform}
                    checked={
                      videogameData
                        ? videogameData.platforms.includes(platform)
                        : false
                    }
                    onChange={() => handlePlatformsOptions(platform)}
                  />
                  {platform}
                </label>
              ))}
            </div>
            <p className={styles.warning}>{errors.platforms}</p>
            <br />
            <label>Genres: </label>
            <div className={styles.checkboxGroup}>
              {genresOptions.map((genre) => (
                <label key={genre.id} className={styles.checkbox}>
                  <input
                    type='checkbox'
                    name={genre.id}
                    value={genre.name}
                    checked={
                      videogameData
                        ? videogameData.genreIds.includes(genre.id)
                        : false
                    }
                    onChange={() => handleGendersOptions(genre)}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
            <p className={styles.warning}>{errors.genreIds}</p>
            <br />
            <button className={styles.submitButton} type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
