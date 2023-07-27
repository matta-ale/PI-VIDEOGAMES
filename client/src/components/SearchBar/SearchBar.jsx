import React from 'react';
import styles from './SearchBar.module.css';
import { useState } from 'react';

const SearchBar = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.searchBarDiv}>
        <input
          type='search'
          placeholder='Search games'
          className={styles.inputBar}
          onChange={handleChange}
          value={search}
        />
        <button
          onClick={() => onSearch(search)}
          className={styles.searchButton}
        >
          Go
        </button>
      </div>
      <div className={StyleSheet.filterDiv}>
        
      </div>
    </div>
  );
};

export default SearchBar;
