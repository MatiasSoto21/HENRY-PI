import React from 'react'
import { Link } from 'react-router-dom';
import s from './Modulecss/Landing.module.css'

function Landing() {
  return (
    <div className={s.landing}>
      <h1>Welcome To Pokefind</h1>
      <Link to='/home'>
        <button>BUSCA Y CREA TU POKEMON</button>
      </Link>
      <img src='https://clickwallpapers.net/wp-content/uploads/2022/06/clickwallpapers-pokemon-4k-img2-scaled-1.jpg' alt="AAA"/>
    </div>
  )
}

export default Landing