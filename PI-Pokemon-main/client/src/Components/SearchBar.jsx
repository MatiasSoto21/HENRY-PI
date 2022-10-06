import React, { useState } from 'react'
import { getPokemonName } from '../Actions';
import { useDispatch } from 'react-redux'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokemonName(name));
    }

  return (
    <div>
        <input type='text' placeholder='Search Pokemon...' onChange={e => handleInputChange(e)}/>
        <button type='submit' onClick={e => handleSubmit(e)}>Search</button>
    </div>
  )
}

export default SearchBar