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
        <div className={s.pika}>

        </div>
      </div>
    </div>
  )
}

export default Landing