import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonDetail } from '../Actions';
import { useEffect } from 'react';

const Detail = (props) => {
const dispatch = useDispatch();
const pokemonDetail = useSelector(state => state.detail)

useEffect(() => {
  dispatch(getPokemonDetail(props.match.params.id));
  /* return () => {
    dispatch(getPokemonDetail(props.match.params.id));
  } */
}, [dispatch])


  return (
    <div>
        {pokemonDetail.length>0 ?
        
        <div>
          <h1>{pokemonDetail[0].name}</h1>
          <img src={pokemonDetail[0].img} alt="Poke img"/>
          <p>{pokemonDetail[0].hp}</p>
          <p>{pokemonDetail[0].attack}</p>
          <p>{pokemonDetail[0].defense}</p>
          <p>{pokemonDetail[0].speed}</p>
          <p>{pokemonDetail[0].height}</p>
          <p>{pokemonDetail[0].weight}</p>
          <p>{pokemonDetail[0].types.map(e => e.name)}</p>
        </div> :
        <div>
          <h1>Pokemon not found 😥</h1>
        </div>
        
         }
    </div>
  )
}

export default Detail