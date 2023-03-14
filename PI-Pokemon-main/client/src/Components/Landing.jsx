import React from 'react'
import { Link } from 'react-router-dom';
import s from './Modulecss/Landing.module.css'
function Landing() {
  return (
    <div className={s.container}>
      <div className={s.landing}>
        <h1>Welcome To Pokefind</h1>
      </div>
      <Link to='/home'>
        <button>Search and Create your Own Pokemon!✨</button>
      </Link>
      <div className={s.sprite}>
      </div>
      <div className={s.chivo}>
        <p>*Single Page App Made by Matias Soto*</p>
        <a rel="noreferrer" href='https://www.instagram.com/matisoto15/' target="_blank" className={s.linkchivo}>
          <p> <img width='30px' height='30px' src='https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-full-gradient-colour-background-900x900.png' alt='insta' />-Instagram</p>
        </a>
        <a rel="noreferrer" href='https://www.linkedin.com/in/matias-soto-760853239/' target="_blank" className={s.linkchivo}>
          <p> <img width='30px' height='30px' src='https://www.citypng.com/public/uploads/preview/linkedin-square-white-icon-transparent-png-11640440452zi2ykndpw2.png' alt='lkdn' />-Linkedin</p>
        </a>
        <a rel="noreferrer" href='https://github.com/MatiasSoto21' target="_blank" className={s.linkchivo}>
          <p> <img width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/733/733609.png' alt='gith' />-Github</p>
        </a>

      </div>
    </div>
  )
}

export default Landing