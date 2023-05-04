const router = require('express').Router()
const db = require('../models')
const axios = require('axios')


//I need to handle incomming request w routes. 
//do some full crud for movies

// GET /favorites -- array of selected favorite movies 
router.get('/', async (req,res) => {
    try{
        const response = await axios.get('')
        const movieData = response.data
        res.json(movieData)
    }catch(err){
        console.log(err)
    }
})
// GET /favorites -- array of selected favorite movies 
router.get('/:id', async (req,res) => {
    try{
        const response = await axios.get('')
        const movieData = response.data
        res.json(movieData)
    }catch(err){
        console.log(err)
    }
})



module.exports= router;

