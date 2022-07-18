const axios = require ('axios');
const { Dog, Temperament } = require('../../db');


const getAllTemperaments = async (req, res) => {

    const tempApi = (await axios.get('https://api.thedogapi.com/v1/breeds')).data
    const tempDB = tempApi.map((temp) => temp.temperament).join().split(',');
    const tempTrim = tempDB.map((temp) => temp.trim());
    const tempAll = new Set(tempTrim)
    tempAll.forEach((temp) =>{
        if(temp !== ''){
            Temperament.findOrCreate({
                where: {
                    name:temp
                }
            })
        }
    })
    
    const allTemperaments = await Temperament.findAll();
    return res.status(200).send(allTemperaments);
}

module.exports = {
    getAllTemperaments
}