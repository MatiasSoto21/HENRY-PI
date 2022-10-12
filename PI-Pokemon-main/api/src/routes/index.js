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

router.delete('/borrar/:id', async (req, res) => {
    const {id} = req.params
    try {
        await Pokemon.destroy({
            where: {
                id: id
            },
            include:{
                model: Type,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        })
        res.status(201).send('poke eliminado')
    } catch (error) {
        res.status(404).send('algo salio mal')
    }
})





module.exports = router;
