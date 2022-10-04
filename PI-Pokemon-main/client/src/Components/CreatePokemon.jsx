import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../Actions';

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);

  const [input, setInput] = useState({
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
  })

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert('Pokemon Created!!')
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <h1>Create your Pokemon!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input onChange={e => handleInputChange(e)} type='text' value={input.name} name='name' />
        </div>
        <div>
          <label>Img:</label>
          <input onChange={e => handleInputChange(e)} type='text' value={input.img} name='img' />
        </div>
        <div>
          <label>Hp:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.hp} name='hp' />
        </div>
        <div>
          <label>Attack:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.attack} name='attack' />
        </div>
        <div>
          <label>Defense:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.defense} name='defense' />
        </div>
        <div>
          <label>Speed:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.speed} name='speed' />
        </div>
        <div>
          <label>Height:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.height} name='height' />
        </div>
        <div>
          <label>Weight:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.weight} name='weight' />
        </div>
        <div>
          <label>Types</label>
          <select onChange={e => handleSelect(e)}>
            {types.map(e =>
              <option key={e.id} value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>)}
          </select>
          <ul><li>{input.types.map(e => e +" ")}</li></ul>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePokemon