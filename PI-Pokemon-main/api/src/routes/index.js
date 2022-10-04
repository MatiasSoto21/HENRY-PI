const { Router } = require('express');
const axios = require('axios');

const { Pokemon, Type } = require('../db');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
////////////////////////////////////////////////////////////////////////////////////////
/* GET https://pokeapi.co/api/v2/pokemon
   GET https://pokeapi.co/api/v2/pokemon/{id}
   GET https://pokeapi.co/api/v2/pokemon/{name}
   GET https://pokeapi.co/api/v2/type */
///////////////////////////////////////////////////////////////////////////
/* GET /pokemons:
Obtener un listado de los pokemons desde pokeapi.
Debe devolver solo los datos necesarios para la ruta principal */
// NOMBRE IMAGEN Y TIPOS

const getApiInfo = async () => {
    const apiEnd = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
        .then(res => {
            return res.data.results;
        })
        .then(array => {
            return Promise.all(array.map(e => axios(e.url)))
        })
        .then(data => {
            return data.map(e => e.data);
        })
    const apiInfo = await apiEnd.map(e => {
        return {
            id: e.id,
            name: e.name,
            img: e.sprites.other.dream_world.front_default,
            types: e.types.map(e => e.type),
            hp: e.stats[0].base_stat,
            attack: e.stats[1].base_stat,
            defense: e.stats[3].base_stat,
            speed: e.stats[5].base_stat,
            height: e.height,
            weight: e.weight
        }
    })
    return apiInfo
};

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
};

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const All = apiInfo.concat(dbInfo);
    return All;
}


router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    let allPokemons = await getAllPokemons();
    if (name) {
        let pokemon = await allPokemons.filter(e => e.name.toLowerCase() === (name.toLowerCase()))
        pokemon.length ?
            res.status(200).send(pokemon) :
            res.status(404).send('Pokemon no encontrado')
    } else {
        res.status(200).send(allPokemons)
    }
})

router.get('/types', async (req, res) => {
    const axiosApi = await axios("https://pokeapi.co/api/v2/type")
    const types = axiosApi.data.results.map(e => e.name)
    types.forEach(e => {
        Type.findOrCreate({
            where: { name: e }
        })
    })
    const allTypes = await Type.findAll();
    res.status(200).send(allTypes);
})

router.post('/pokemons', async (req, res) => {
    let { name, img, hp, attack, defense, speed, height, weight, createdInDb, types } = req.body
    if (!name) res.send('El nombre es obligatorio');
    await axios("http://localhost:3001/types")
    let newPokemon = await Pokemon.create({
        name,
        img,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb
    });
    let typesDb = await Type.findAll({
        where : { name : types} 
    })
    console.log(types)
    console.log("ACA", typesDb);
    console.log(newPokemon);
    newPokemon.addTypes(typesDb)
    res.send('Pokemon creado con exito')
})

router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id
    let allPokemons = await getAllPokemons();
    if (id) {
        let pokemon = await allPokemons.filter(e => e.id == id);
        console.log(pokemon)
        pokemon.length ?
            res.status(200).json(pokemon) :
            res.status(404).send('La id no coincide con ningun pokemon')
    }
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
