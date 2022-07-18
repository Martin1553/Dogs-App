const axios = require ('axios');
const {Dog, Temperament} = require('../../db')

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
    const apiInfo = apiUrl.data
    const allApiDogs = apiInfo.map((dog) => {
        dog.weightToArray = dog.weight.metric.split(' - ')
        if(dog.weightToArray.length === 2) {
            dog.min_weight = isNaN(dog.weightToArray[0]) ? 0 : parseInt(dog.weightToArray[0]);
            dog.max_weight = isNaN(dog.weightToArray[1]) ? 0 : parseInt(dog.weightToArray[1]);
        } else if(!isNaN(dog.weight.metric)) {
            dog.min_weight = parseInt(dog.weight.metric)
            dog.max_weight = parseInt(dog.weight.metric)

        }
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            temperaments: dog.temperament,
            height: dog.height.metric + ' Cm.',
            min_weight: dog.min_weight,
            max_weight: dog.max_weight,
            lifeSpan: dog.life_span
        }
    })
    return allApiDogs
}

const getDbInfo = async () => {
    const dbInfo = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return mapper(dbInfo)
}

const mapper = (ArrayObj) => {
    return ArrayObj.map(({
        id,
        name,
        image,
        height,
        min_weight,
        max_weight,
        lifeSpan,
        createdInDb,
        temperaments,
    }) => ({
        id,
        name,
        image,
        height: height + 'Cm.',
        min_weight,
        max_weight,
        lifeSpan: lifeSpan + ' años',
        createdInDb,
        temperaments: temperaments.map(t => t.name).join(', '),
    }))
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    const allInfo = apiInfo.concat(dbInfo)
    return allInfo;
}

const showAllDogs = async (req, res) => {
    const name = req.query.name;

    try {
        let dogsTotal = await getAllDogs();
        if(name) {
            let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length ? 
            res.status(200).send(dogName) :
            res.status(404).send('El perro con ese nombre no existe.')
        } else {
            res.status(200).send(dogsTotal)
        }
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    showAllDogs,
    getAllDogs
}