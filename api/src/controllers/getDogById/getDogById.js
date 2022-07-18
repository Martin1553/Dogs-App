const axios = require('axios');
const { Dog, Temperament } = require('../../db')
const { getAllDogs } = require('../getAllDogs/getAllDogs')

const showDogById = async (req, res) => {
    try {
    const id = req.params.id
    const allDogs = await getAllDogs();

        if (id) {
            const filterDog = await allDogs.filter(dog => dog.id == id)
            if(filterDog) {
                res.json(filterDog)
            } else {
                res.status(404).send({msg: 'ID no encontrado.'})
            }
        }
    }catch(e) {
        console.log(e)
        res.status(500).send('No se encontraron los perros.')
    }
}

module.exports = {
    showDogById
}