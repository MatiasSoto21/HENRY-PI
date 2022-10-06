import { GET_ALL_POKEMONS, FILTER_BY_TYPE, FILTER_BY_CREATION, ORDER_BY_ATTACK, GET_POKEMON_NAME, ORDER_BY_NAME, GET_TYPES,POST_POKEMON, GET_DETAIL, CLEAN } from "../Actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }    
        case GET_TYPES   :
            return {
                ...state,
                types: action.payload
            }
        case POST_POKEMON:
            return {
                ...state
            }     
        case FILTER_BY_TYPE:
            const allPokemon = state.allPokemons
            const filterType = action.payload === "All" ? allPokemon : allPokemon.filter(pokemon => pokemon.types.find(e => e.name === action.payload))
            return {
                ...state,
                pokemons: filterType
            }
        case FILTER_BY_CREATION:
            const allPokemons = state.allPokemons
            const filterByCreation = action.payload === 'Api' ? allPokemons.filter(e => !e.createdInDb) : allPokemons.filter(e => e.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : filterByCreation
            }
        case ORDER_BY_ATTACK:
            const orderByAttack = action.payload === 'min' ? state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) return 1;
                if (b.attack > a.attack) return -1;
                return 0;
            }) :
            state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) return -1;
                    if (b.attack > a.attack) return  1;
                    return 0;
                })        
            return {
                ...state,
                pokemons: orderByAttack
            }

        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemons: action.payload
            }

        case ORDER_BY_NAME:
            const orderByName = action.payload === 'A-Z' ? state.pokemons.sort(function (a,b){
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                return 0;
            }) :
            state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return  1;
                    return 0;
            })
            return {
                ...state,
                pokemons: orderByName
            }

        case CLEAN:
            return {
                ...state,
                detail: []
            }    
        default:
            return state
    }
}

export default rootReducer;