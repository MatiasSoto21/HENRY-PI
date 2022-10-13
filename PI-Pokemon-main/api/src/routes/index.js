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






module.exports = router;
