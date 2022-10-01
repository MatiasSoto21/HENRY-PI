import { GET_ALL_POKEMONS, FILTER_BY_TYPE, FILTER_BY_CREATION, ORDER_BY_ATTACK } from "../Actions";

const initialState = {
    pokemons: [],
    allPokemons: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
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
            const allPokemon3 = state.allPokemons
            const orderByAttack = action.payload === 'min' ? allPokemon3.sort(function (a, b) {
                if (a.attack > b.attack) return 1;
                if (b.attack > a.attack) return -1;
                return 0;
            }) :
            allPokemon3.sort(function (a, b) {
                    if (a.attack > b.attack) return -1;
                    if (b.attack > a.attack) return  1;
                    return 0;
                })
            return {
                ...state,
                pokemons: orderByAttack
            }
        default:
            return state
    }
}

export default rootReducer;