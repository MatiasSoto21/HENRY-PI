import React from 'react'

const Pag = ({ pokemonsPerPage, allPokemons, paginado }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map(e => 
                        <li key={e}>
                            <button onClick={() => paginado(e)}>{e}</button>
                        </li>
                    )}
            </ul>
        </nav>
    )
}

export default Pag