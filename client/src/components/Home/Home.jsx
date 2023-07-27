import React from 'react'
import styles from './Home.module.css'
import SearchBar from '../SearchBar/SearchBar'
import Cards from '../Cards/Cards'
import image from '../../img/pexels-lalesh-aldarwish-194511.jpg'

const Home = () => {
  
  return (
    <div className = {styles.home}>Home
      <SearchBar/>
      <Cards/>
    </div>
  )
}

export default Home