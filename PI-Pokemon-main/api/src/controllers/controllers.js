const axios = require('axios');
const { Pokemon, Type } = require('../db');

/////////////////////////////

const getApiInfo = async () => {
    const apiEnd = await axios("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")
        .then(res => {
            return res.data.results;
        })
        .then(array => {
            return Promise.all(array.map(e => axios(e.url)))
        })
        .then(datos => {
            return datos.map(e => e.data);
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

module.exports = { getAllPokemons };