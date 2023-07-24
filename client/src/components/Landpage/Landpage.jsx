import React from 'react'
import styles from './Landpage.module.css'
import { ROUTES } from '../../Helpers/PathRouters'
import {useNavigate} from 'react-router-dom'

const Landpage = () => {
    const navigate = useNavigate()
    
    function handleEnterSite() {
        navigate(ROUTES.HOME)
      }
  
  return (
    <div>
        <button className={styles.enterSiteButton} onClick={handleEnterSite}>Enter site</button>
    </div>
  )
}

export default Landpage  