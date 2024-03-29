import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonDetail, clean } from '../Actions';
import { useEffect } from 'react';
import styles from './Modulecss/Detail.module.css'

const Detail = (props) => {

  const dispatch = useDispatch();
  const pokemonDetail = useSelector(state => state.detail)
  useEffect(() => {
    dispatch(getPokemonDetail(props.match.params.id));
    return () => {
      dispatch(clean());
    }
  }, [dispatch, props.match.params.id])


  return (
    <div>

      {pokemonDetail.length > 0 ?
        <div className={styles.container}>
          <Link to="/home"><button className={styles.button}>Go Back</button></Link>

          <div className={styles.detail}>
            <div className={styles.header}>
              <h1>{pokemonDetail[0].name[0].toUpperCase() + pokemonDetail[0].name.substring(1)}</h1>
              <img className={styles.pokemon} src={pokemonDetail[0].img ? pokemonDetail[0].img : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f82cc357-e354-4ef7-8b2d-647f6f756800/dbf1jrd-095f7fd1-e33b-4e26-b456-8cbf40d0e5d1.png/v1/fill/w_1024,h_765,q_80,strp/quien_es_ese_pokemon__who_s_that_poke___by_shikomt_by_shikomt_dbf1jrd-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY1IiwicGF0aCI6IlwvZlwvZjgyY2MzNTctZTM1NC00ZWY3LThiMmQtNjQ3ZjZmNzU2ODAwXC9kYmYxanJkLTA5NWY3ZmQxLWUzM2ItNGUyNi1iNDU2LThjYmY0MGQwZTVkMS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.YZOIomNz5t-pjv59EuK-mtru0QgjhlTtGEGPLuzR1hM"} alt="Poke img" width="300px" height="400px" />
              <img className={styles.pokeball} src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png' alt='pokeball' />
            </div>
            <div className={styles.lospe}>
              <div className={styles.divstat}>
              <p className={styles.statshp}>Hp : {pokemonDetail[0].hp}</p>
              <p className={styles.statsat}>Attack: {pokemonDetail[0].attack}</p>
              <p className={styles.statsdf}>Defense: {pokemonDetail[0].defense}</p>
              <p className={styles.statsSpAt}>Sp.Atk: {pokemonDetail[0].specialAttack}</p>
              <p className={styles.statsSpDef}>Sp.Def: {pokemonDetail[0].specialDefense}</p>
              <p className={styles.statssp}>Speed: {pokemonDetail[0].speed}</p>
              <p className={styles.statType}>Types: {pokemonDetail[0].types.map(e => e.name[0].toUpperCase() + e.name.substring(1) + ' ')}</p>
              </div>
            </div>
          </div>
        </div>
        :
        <div className={styles.loading}>
          <img src='https://i.postimg.cc/cHQL866z/char.gif'
            alt='loading' />
          <h1>Loading...</h1>
        </div>

      }
    </div>
  )
}

export default Detail