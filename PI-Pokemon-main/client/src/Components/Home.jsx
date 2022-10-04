import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, order, orderByName} from '../Actions';
import Card from './Card';
import Pag from './Pag';
import SearchBar from './SearchBar';
import FilterType from './FilterType';
import FilterCreation from './FilterCreation';

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
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleOrderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setPag(1)
    setOrdernado(`Ordenado por ${e.target.value}`)
  }

  function handleOrder(e){
    dispatch(order(e.target.value))
    setPag(1)
    setOrdernado(`Ordenado${e.target.value}`)
  }


  return (
    <div>
      <Link to='/pokemons'> Crear Pokemon </Link>
      <h1> PokeFind </h1>
      <button onClick={e => handleClick(e)}> Volver a cargar todos los pokemons</button>
      <div>
        <FilterType/>
        <FilterCreation/>
        <select onChange={e => handleOrderByName(e)}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select onChange={e => handleOrder(e)}>
          <option value="max">➕Attack</option>
          <option value="min">➖Attack</option>
        </select>
        <Pag pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado}/>
        <SearchBar/>
        {currentPokemons?.map(e =>
            <Link to={'/detail/' + e.id} key={e.id}>
              <Card
                key={e.id}
                id={e.id}
                name={e.name}
                img={e.img}
                types={e.types}
              />
            </Link>
          )}
      </div>
    </div>
  )
}

export default Home