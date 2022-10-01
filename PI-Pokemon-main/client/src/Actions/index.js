import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS'
export const GET_TYPES = 'GET_TYPES'
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE'
export const FILTER_BY_CREATION = 'FILTER_BY_CREATION'
export const ORDER_BY_ATTACK = 'ORDER'

export function getPokemons() {
    return async function(dispatch){
        return axios ("http://localhost:3001/pokemons")
        .then(res => dispatch({
            type: GET_ALL_POKEMONS,
            payload: res.data
        }))
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