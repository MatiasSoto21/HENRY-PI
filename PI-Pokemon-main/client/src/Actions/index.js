import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION';
export const ORDER_BY_ATTACK = 'ORDER';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const POST_POKEMON = 'POST_POKEMON';

export function getPokemons() {
    return async function(dispatch){
        return await axios("http://localhost:3001/pokemons")
        .then(res => dispatch({
            type: GET_ALL_POKEMONS,
            payload: res.data
        }))
    }
}

export function getPokemonName (name){
    return async function(dispatch){
        return await axios("http://localhost:3001/pokemons?name=" + name)
        .then(res => dispatch({
            type: GET_POKEMON_NAME,
            payload: res.data
        }))
    }
}

export function getTypes (){
    return async function(dispatch){
        return await axios ("http://localhost:3001/types")
        .then(res => dispatch({
            type: GET_TYPES,
            payload: res.data
        }))
    }
}

export function postPokemon (payload){
    return async function(dispatch){
        return await axios.post("http://localhost:3001/pokemons", payload);
    }
}

export function filterByType(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export function filteryByCreation(payload){
    return {
        type: FILTER_BY_CREATION,
        payload
    }
}

export function order(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}