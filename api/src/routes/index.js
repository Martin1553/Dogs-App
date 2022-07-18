const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {showAllDogs} = require('../controllers/getAllDogs/getAllDogs')
const {showDogById} = require('../controllers/getDogById/getDogById')
const {getAllTemperaments} = require('../controllers/getTemperaments/getTemperaments')
const {dogCreate} = require('../controllers/PostDog/postDog')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', showAllDogs)

router.get('/dogs/:id', showDogById)

router.get('/temperament', getAllTemperaments)

router.post('/dog' , dogCreate)
module.exports = router;
