import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
    specialAttack: '',
    specialDefense: '',
    types: []
  })

  function validate(input) {
    let errors = {};
    if (!/^[A-Za-z]+$/.test(input.name) || input.name.length > 255) errors.name = 'Name must have A-z characters and be less than 255';
    if (!input.img) errors.img = 'Insert URL of an image(optional)';
    if (input.hp < 1 || input.hp > 999) errors.hp = 'Hp must be 1-999';
    if (input.attack < 1 || input.attack > 999) errors.attack = 'Attack must be 1-999';
    if (input.defense < 1 || input.defense > 999) errors.defense = 'Defense must be 1-999';
    if (input.speed < 1 || input.speed > 999) errors.speed = 'Speed must be 1-999';
    if (input.height < 1 || input.height > 999) errors.height = 'Height must be 1-999';
    if (input.weight < 1 || input.weight > 999) errors.weight = 'Weight must be 1-999';
    if (input.specialAttack < 1 || input.specialAttack > 999) errors.specialAttack = 'SpAt must be 1-999';
    if (input.specialDefense < 1 || input.specialDefense > 999) errors.specialDefense = 'SpDef must be 1-999';

    if (!input.types.length) errors.types = 'Select at least 1 type';

    return errors;
  }



  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: !input.types.includes(e.target.value) ? input.types.concat(e.target.value) : input.types
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
    setInput({
      name: '',
      img: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      specialAttack: '',
      specialDefense: '',
      types: []
    })
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Link to="/home"><button className={styles.button}>Go Back</button></Link>
      <h1>Create your Pokemon!</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input onChange={e => handleInputChange(e)} type='text' value={input.name} name='name' /* required pattern='[A-Za-z]+' */ />
          {errors.name && <p>*{errors.name}</p>}
        </div>
        <div>
          <label>ImgURL:</label>
          <div className={styles.img}>
            <input onChange={e => handleInputChange(e)} type='text' value={input.img} name='img' />
          </div>
          {errors.img && <p>{errors.img}</p>}
        </div>
        <div>
          <label>Hp:</label>
          <div className={styles.hp} >
            <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.hp} name='hp' />
          </div>
          <span>{input.hp}</span>
          {errors.hp && <p>*{errors.hp}</p>}
        </div>
        <div>
          <label>Attack:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.attack} name='attack' />
          <span>{input.attack}</span>
          {errors.attack && <p>*{errors.attack}</p>}
        </div>
        <div>
          <label>Defense:</label>
          <div className={styles.defense}>
            <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.defense} name='defense' />
          </div>
          <span>{input.defense}</span>
          {errors.defense && <p>*{errors.defense}</p>}
        </div>
        <div>
          <label>Speed:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.speed} name='speed' />
          <span>{input.speed}</span>
          {errors.speed && <p>*{errors.speed}</p>}
        </div>
        <div>
          <label>Height:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.height} name='height' />
          <span>{input.height}</span>
          {errors.height && <p>*{errors.height}</p>}
        </div>
        <div>
          <label>Weight:</label>
          <input onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.weight} name='weight' />
          <span>{input.weight}</span>
          {errors.weight && <p>*{errors.weight}</p>}
        </div>
        <div>
          <label>SpAttack:</label>
          <input id={styles.inputatk} onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.specialAttack} name='specialAttack' />
          <span>{input.specialAttack}</span>
          {errors.specialAttack && <p>*{errors.specialAttack}</p>}
        </div>
        <div>
          <label>SpDefense:</label>
          <input id={styles.inputdef} onChange={e => handleInputChange(e)} type='range' min='1' max='999' value={input.specialDefense} name='specialDefense' />
          <span>{input.specialDefense}</span>
          {errors.specialDefense && <p>*{errors.specialDefense}</p>}
        </div>
        <div>
          <label>Types</label>
          <select onChange={e => handleSelect(e)}>
            {types.map(e =>
              <option key={e.id} value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>)}
          </select>
          {input.types?.map((e, i) =>
            <div className={styles.typediv} style={{ display: "flex", margin: "5px" }} key={i}>
              <p className={styles.ptypes}>{e[0].toUpperCase() + e.substring(1)}</p>
              <button id={styles.delete} type='reset' onClick={() => handleDelete(e)} >X</button>
            </div>
          )}
          {errors.types && <p>*{errors.types}</p>}
        </div>
        {!errors.specialAttack && !errors.specialDefense && !errors.attack && !errors.defense && !errors.speed && !errors.height && !errors.weight && !errors.hp && !errors.name && input.types.length > 0 ? <button id={styles.create} type='submit'>Create!</button> : <p>*All Fields Must Be Completed Except Img</p>}
      </form>

    </div>
  )
}

export default CreatePokemon