const {getAllPokemons} = require('../controllers/controllers')
const { Pokemon, Type } = require('../db')


const pokemons = async (req, res) => {
    const {name} = req.query
    let allPokemons = await getAllPokemons();
    if (name) {
        let pokemon = allPokemons.filter(e => e.name.toLowerCase() === (name.toLowerCase()))
        pokemon.length > 0 ?
            res.status(200).send(pokemon) :
            res.status(404).send('Pokemon no encontrado')
    } else {
        res.status(200).send(allPokemons)
    }
}

const createpokemon = async (req, res) => {
    let { name, img, hp, attack, defense, speed, height, weight, createdInDb, types, specialAttack, specialDefense } = req.body
    if (!name) res.send('El nombre es obligatorio');
    let newPokemon = await Pokemon.create({
        name,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        specialAttack,
        specialDefense,

        createdInDb
    });
    let typesDb = await Type.findAll({
        where : { name : types } 
    })
    newPokemon.addType(typesDb)
    res.send('Pokemon creado con exito')
}


const pokemonId = async (req, res) => {
    const {id} = req.params
    let allPokemons = await getAllPokemons();
    if (id) {
        let pokemon = allPokemons.filter(e => e.id == id);
        pokemon.length > 0?
            res.status(200).json(pokemon) :
            res.status(404).send('La id no coincide con ningun pokemon')
    }
}

module.exports = { pokemons, createpokemon, pokemonId }