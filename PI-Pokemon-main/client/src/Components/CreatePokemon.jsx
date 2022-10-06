import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../Actions';
import styles from './Modulecss/CreatePokemon.module.css'

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);

  const [errors, setErrors] = useState({});

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
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log("input", input);
    console.log("errors", errors)
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
    setErrors(validate({
      ...input,
      types: e.target.value
    }))
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter(type => type !== e)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert('Pokemon Created!!')
  }

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = 'Name is needed';
    if (!input.img) errors.img = 'Insert URL of an image';
    if (!input.hp) errors.hp = 'Set a hp value';
    if (!input.attack) errors.attack = 'Set an attack value';
    if (!input.defense) errors.defense = 'Set a defense value';
    if (!input.speed) errors.speed = 'Set a speed value';
    if (!input.height) errors.height = 'Set a height value';
    if (!input.weight) errors.weight = 'Set a weight value';
    if (!input.types.length) errors.types = 'Select at least 1 type';

    return errors;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Create your Pokemon!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input onChange={e => handleInputChange(e)} type='text' value={input.name} name='name' required pattern='[A-Za-z]+' />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Img:</label>
          <input onChange={e => handleInputChange(e)} type='text' value={input.img} name='img' />
          {errors.img && <p>{errors.img}</p>}
        </div>
        <div>
          <label>Hp:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.hp} name='hp'  />
          <span>{input.hp}</span>
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <label>Attack:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.attack} name='attack' />
          <span>{input.attack}</span>
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <label>Defense:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.defense} name='defense' />
          <span>{input.defense}</span>
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <label>Speed:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.speed} name='speed' />
          <span>{input.speed}</span>
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <label>Height:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.height} name='height' />
          <span>{input.height}</span>
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <label>Weight:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.weight} name='weight' />
          <span>{input.weight}</span>
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <label>Types</label>
          <select onChange={e => handleSelect(e)}>
            {types.map(e =>
              <option key={e.id} value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>)}
          </select>
          {errors.types && <p>{errors.types}</p>}
        </div>
        {Object.entries(errors).length === 1? <button type='submit'>Create</button> : <p>faltan datos</p>}
      </form>
      {input.types?.map(e =>
        <div key={e}>
          <p>{e}</p>
          <button onClick={() => handleDelete(e)} >x</button>
        </div>
      )}
    </div>
  )
}

export default CreatePokemon