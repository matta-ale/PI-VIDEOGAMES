import React from 'react';
import {useState} from 'react';
import styles from './Form.module.css';
import {validation} from './validation'
import { genresOptions } from '../../Helpers/genresOptions';
import loginImage from '../../img/form_image.webp'
import axios from 'axios'


const Form = () => {
  const [videogameData, setVideogameData] = useState({ name: '', description: '',platforms:[],image:'', released:'',rating:'',genreIds:[]});
  const [errors, setErrors] = useState({ name: '', description: '',platforms:'',image:'', released:'',rating:'',genreIds:''});

  const handleChange = (event) => {
    const property = event.target.name;
    setVideogameData({ ...videogameData, [property]: event.target.value });
    setErrors(validation({ ...videogameData, [property]: event.target.value }));
  };

  //este handler sincroniza los checkbox con el videogameData
  const handleGenderOptions = (genre) => {
    setVideogameData((prevGenreIds) =>  //useState puede tomar una callback como argumento, donde el argumento input de la misma es el estado previo
      prevGenreIds.includes(genre.id)
        ? prevGenreIds.filter((g) => g !== genre.id)
        : [...prevGenreIds, genre.id]
    );
  };

  const handleNewVideogame = async (videogameData) => {
    try {
        const {data} = await axios.post('/videogames',videogameData)
        window.alert('Videogame created ' + data);
    } catch (error) {
        console.error(error)
    }
  }

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     handleLogin(videogameData)
//   }
  return (
    <div className={styles.formContainer}>
      <div className={styles.formDiv}>
        <div className={styles.titleContainer}>
          <div className={styles.loginAndRegister}>
            <h1>Please enter videogame data</h1>
          </div>
          <img className={styles.loginImg} src={loginImage} alt='Login' />
        </div>
        <form className={styles.form} onSubmit={handleNewVideogame}>
          <label htmlFor=''>Name: </label>
          <input
            className={styles.input}
            type='text'
            name='name'
            placeholder='Type videogame name...'
            onChange={handleChange}
            value={videogameData.name}
          />
          <p className={styles.warning}>{errors.name}</p>
          <br />
          <label htmlFor=''>Description: </label>
          <input
            className={styles.input}
            type='text'
            name='description'
            placeholder='Type a description of the videogame...'
            onChange={handleChange}
            value={videogameData.description}
          />
          <p className={styles.warning}>{errors.description}</p>
          <br />
          <label htmlFor=''>Platforms: </label>
          <input
            className={styles.input}
            type='text'
            name='platforms'
            placeholder='Type a platform of the videogame...'
            onChange={handleChange}
            value={videogameData.platforms}
          />
          <p className={styles.warning}>{errors.platforms}</p>
          <br />
          <label htmlFor=''>Image: </label>
          <input
            className={styles.input}
            type='text'
            name='image'
            placeholder='Type URL of an image of the videogame...'
            onChange={handleChange}
            value={videogameData.image}
          />
          <p className={styles.warning}>{errors.image}</p>
          <br />
          <label htmlFor=''>Released date: </label>
          <input
            className={styles.input}
            type='date'
            name='released'
            placeholder='Type URL of an image of the videogame...'
            onChange={handleChange}
            value={videogameData.released}
          />
          <p className={styles.warning}>{errors.released}</p>
          <br />
          <label htmlFor=''>Rating: </label>
          <input
            className={styles.input}
            type='float'
            name='rating'
            placeholder='Type a number from 0 to 5 with one decimal value'
            onChange={handleChange}
            value={videogameData.rating}
          />
          <p className={styles.warning}>{errors.rating}</p>
          <br />
          {genresOptions.map((genre) => (
          <label key={genre.id}>
            <input
              type='checkbox'
              name={genre.id}
              value={genre.name}
              checked={videogameData.genreIds.includes(genre.id)}
              onChange={() => handleGenderOptions(genre)}
            />
            {genre.name}
          </label>
        ))}
          <p className={styles.warning}>{errors.genreIds}</p>
          <br />
          <button className={styles.submitButton} type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
