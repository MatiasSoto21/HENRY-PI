const {Type} = require('../db');
const axios = require('axios');

const type = async (req, res) => {
    const axiosApi = await axios("https://pokeapi.co/api/v2/type")
    const types = axiosApi.data.results.map(e => e.name)
    types.forEach(e => {
        Type.findOrCreate({
            where: { name: e }
        })
    })
    const allTypes = await Type.findAll();
    res.status(200).send(allTypes);
}

module.exports = { type }