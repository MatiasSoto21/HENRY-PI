import React from 'react'
import { Link } from 'react-router-dom';
import s from './Modulecss/Landing.module.css'
function Landing() {
  return (
    <div className={s.container}>
      <div className={s.landing}>
        <h1>Welcome To Pokefind</h1>
        <Link to='/home'>
          <button>BUSCA Y CREA TU POKEMON</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing