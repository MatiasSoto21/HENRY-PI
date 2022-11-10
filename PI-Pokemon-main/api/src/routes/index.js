const { Router } = require('express');
const axios = require('axios');
const { getAllPokemons } = require('../controllers/controllers.js')
const { pokemons, createpokemon, pokemonId } = require('./pokemons')
const { type } = require('./types')
const { Pokemon, Type } = require('../db');
const router = Router();
/////////////////////////////////////////////////

router.get('/pokemons', pokemons)

router.get('/types', type)

router.post('/pokemons', createpokemon)

router.get('/pokemons/:id', pokemonId)

router.post('/crear', async (req,res) => {
    const {name} = req.body
    try {
        await Type.create({
            name: name
        })
        res.status(200).send('Tipo creado')
    } catch (error) {
        res.status(404).send('algo salio mal')
    }
})







module.exports = router;
