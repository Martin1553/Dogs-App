const {Dog, Temperament} = require('../../db')
const { getAllDogs } = require('../getAllDogs/getAllDogs')

const dogCreate = async (req, res) => {
    try {
    
    let {
        name,
        image,
        temperaments,
        height,
        min_weight,
        max_weight,
        lifeSpan,
        createdInDb
    } = req.body

    let dog = await getAllDogs()

    let doggie = await dog.find(e => e.name.toLowerCase() === name.toLowerCase())

    if(doggie) {
        return res.status(400).send({msg: 'El nombre de la raza ya existe'})
    } else {

            let dogCreate = await Dog.create({
            name,
            image,
            height,
            min_weight,
            max_weight,
            lifeSpan,
            createdInDb
        })

        let tempDb = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        
        dogCreate.addTemperament(tempDb)
    }
        res.send({msg:'Perro añadido correctamente'})
    } catch(e) {
        res.send(e)
    }
}

module.exports = {
    dogCreate
}