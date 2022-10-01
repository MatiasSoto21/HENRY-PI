import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, filterByType, filteryByCreation, order } from '../Actions';
import Card from './Card';
import Pag from './Pag';

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

  function handleFilterByType(e) {
    dispatch(filterByType(e.target.value));
  }

  function handleFilterByCreation(e) {
    dispatch(filteryByCreation(e.target.value))
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
        <select onChange={e => handleFilterByType(e)}>
          <option value="All">All</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="steel">Steel</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="psychic">Psychic</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>
        <select onChange={e => handleFilterByCreation(e)}>
          <option value="All">All</option>
          <option value="Api">Already Exist</option>
          <option value="Created">Created by you</option>
        </select>
        <select>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
        <select onChange={e => handleOrder(e)}>
          <option value="max">➕Attack</option>
          <option value="min">➖Attack</option>
        </select>
        <Pag
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
        {
          currentPokemons?.map(e =>
            <Link to={'/detail/' + e.id} key={e.id}>
              <Card
                key={e.id}
                id={e.id}
                name={e.name}
                img={e.img}
                types={e.types}
              />
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Home