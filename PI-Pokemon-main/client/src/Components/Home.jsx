import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, order, orderByName } from '../Actions';
import Card from './Card';
import Pag from './Pag';
import SearchBar from './SearchBar';
import FilterType from './FilterType';
import FilterCreation from './FilterCreation';
import styles from './Modulecss/Home.module.css'

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [ordenado, setOrdernado] = useState('');
  const [pag, setPag] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
  const lastPokemon = pag * pokemonsPerPage
  const firstPokemon = lastPokemon - pokemonsPerPage
  const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon)

  const paginado = (number) => {
    setPag(number)
  }

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch])

  function handleClick(e) {
    dispatch(getPokemons());
  }

  function handleOrderByName(e) {
    setOrdernado(`Ordenado por ${e.target.value}`)
    dispatch(orderByName(e.target.value))
    setPag(1)
  }

  function handleOrder(e) {
    setOrdernado(`Ordenado${e.target.value}`)
    dispatch(order(e.target.value))
    setPag(1)
  }


  return (
    <div className={styles.container}>
      <Link to='/pokemons'> <button className={styles.buttonCreate}>Crear Pokemon</button> </Link>
      <h1> PokeFind </h1>
      <div className={styles.divbutton}>
        <button className={styles.buttonReload} onClick={e => handleClick(e)}>Reload Page</button>
      </div>
      <div className={styles.filters}>
        <FilterType />
        <FilterCreation />
      </div>
      <div className={styles.orders}>
        <div className={styles.az}>
          Sort By<select onChange={e => handleOrderByName(e)}>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className={styles.attack}>
          Sort By<select onChange={e => handleOrder(e)}>
            <option value="max">➕Attack</option>
            <option value="min">➖Attack</option>
          </select>
        </div>
      </div>
      <div className={styles.containerPagSearch}>
        <Pag pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
        <SearchBar />
      </div>
      <div className={styles.pokemons}>
        {currentPokemons?.map(e =>
          <div className={styles.card} key={e.id}>
            <Link to={'/detail/' + e.id} className={styles.link} key={e.id}>
              <Card
                id={e.id}
                name={e.name}
                img={e.img}
                types={e.types}
              />
            </Link>
          </div>
        )}
      </div>

    </div>
  )
}

export default Home