import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../Actions';

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector(state => state.types);

  const [errors,setErrors] = useState({});

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
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    })
  }

  function handleDelete(e){
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
    if (!input.types) errors.types = 'Select at least 1 type';  

    return errors;
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
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Img:</label>
          <input onChange={e => handleInputChange(e)} type='text' value={input.img} name='img' />
          {errors.img && <p>{errors.img}</p>}
        </div>
        <div>
          <label>Hp:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.hp} name='hp' />
          {errors.hp && <p>{errors.hp}</p>}
        </div>
        <div>
          <label>Attack:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.attack} name='attack' />
          {errors.attack && <p>{errors.attack}</p>}
        </div>
        <div>
          <label>Defense:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.defense} name='defense' />
          {errors.defense && <p>{errors.defense}</p>}
        </div>
        <div>
          <label>Speed:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.speed} name='speed' />
          {errors.speed && <p>{errors.speed}</p>}
        </div>
        <div>
          <label>Height:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.height} name='height' />
          {errors.height && <p>{errors.height}</p>}
        </div>
        <div>
          <label>Weight:</label>
          <input onChange={e => handleInputChange(e)} type='number' value={input.weight} name='weight' />
          {errors.weight && <p>{errors.weight}</p>}
        </div>
        <div>
          <label>Types</label>
          <select onChange={e => handleSelect(e)}>
            {types.map(e =>
              <option key={e.id} value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>)}
          </select>
          {errors.types && <p>{errors.types}</p>}
          {/* <ul><li>{input.types.map(e => e +" ")}</li></ul> */}
        </div>
          <button type='submit'>Create</button>
      </form>
          {input.types?.map(e => 
            <div>
              <p>{e}</p>
              <button onClick={() => handleDelete(e)} >x</button>
            </div>
            )}
    </div>
  )
}

export default CreatePokemon