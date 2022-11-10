import { GET_ALL_POKEMONS, FILTER_BY_TYPE, FILTER_BY_CREATION, ORDER_BY_ATTACK, GET_POKEMON_NAME, ORDER_BY_NAME, GET_TYPES, POST_POKEMON, GET_DETAIL, CLEAN, FAIL, SEARCH, SPECIAL } from "../Actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case POST_POKEMON:
            return {
                ...state
            }
        case FILTER_BY_TYPE:
            const filterType = action.payload === "All" ? state.allPokemons : state.allPokemons.filter(pokemon => pokemon.types.find(e => e.name === action.payload)    )
            return {
                ...state,
                pokemons: filterType.length > 0 ? filterType : 'Todavía no hay pokemons de ese tipo'
            }
        case FILTER_BY_CREATION:
            const filterByCreation = action.payload === 'Api' ? state.allPokemons.filter(e => !e.createdInDb) : state.allPokemons.filter(e => e.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : filterByCreation.length ? filterByCreation : 'Todavia no creaste ningun pokemon'
            }
        case ORDER_BY_ATTACK:
            const orderByAttack = action.payload === 'min' ? state.pokemons.sort(function (a, b) {
                if (a.attack > b.attack) return 1;
                if (b.attack > a.attack) return -1;
                return 0;
            }) :
                state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) return -1;
                    if (b.attack > a.attack) return 1;
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
            const orderByName = action.payload === 'A-Z' ? state.pokemons.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                return 0;
            }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
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

        case FAIL:
            return {
                ...state,
                pokemons: action.payload
            }

        case SEARCH:
            const filtro = action.payload ? state.allPokemons.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase())) : state.allPokemons
            return {
                ...state,
                pokemons: filtro
            }
        case SPECIAL:
            const special = action.payload === 'mayor'? state.allPokemons.filter(e => e.specialAttack > 80) : state.allPokemons
            return{
                ...state,
                pokemons: special
            }

        default:
            return state
    }
}

export default rootReducer;