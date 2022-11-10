import React from 'react'
import styles from './Modulecss/Pag.module.css'

const Pag = ({ pokemonsPerPage, allPokemons, paginado, setPag }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <nav className={styles.container}>

            {pageNumbers?.map((e, i) =>
                <button className={e === setPag?styles.buttonActive : styles.buttonPag} key={i} onClick={() => paginado(e)}>{e}</button>

            )}

        </nav>
    )
}

export default Pag