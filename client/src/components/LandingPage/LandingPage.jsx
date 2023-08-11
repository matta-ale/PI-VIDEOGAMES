// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import styles from './LandingPage.module.css';
import { ROUTES } from '../../Helpers/PathRouters';
import { useNavigate } from 'react-router-dom';

const Landpage = () => {
  const navigate = useNavigate();

  const handleEnterSite = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>VIDEOGAMES</h1>
          <button className={styles.enterSiteButton} onClick={handleEnterSite}>
            Enter site
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landpage;
