import React, { useState } from 'react'
import { getPokemonName } from '../Actions';
import { useDispatch } from 'react-redux';
import styles from './Modulecss/SearchBar.module.css';
import { searchpokemon } from '../Actions';




const SearchBar = () => {

  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    setName(e.target.value);
    dispatch(searchpokemon(e.target.value))
  }

 /*  function handleSubmit(e) {
    dispatch(getPokemonName(name));
  } */

  return (
    <div className={styles.container}>
      <input type='text' placeholder='Search Pokemon... ' onChange={e => handleInputChange(e)} />
      {/* <button type='submit' onClick={e => handleSubmit(e)}>Search</button> */}
    </div>
  )
}

export default SearchBar