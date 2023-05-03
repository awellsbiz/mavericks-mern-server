const router = require('express').Router()
const db = require('../models')

//I need to handle incomming request w routes. 
//do some full crud for movies

// GET /favorites -- array of selected favorite movies 
router.get('/', async (req,res) => {
    try{
        const favorites= await db.User.id('6452cbf785d57e0fa68d23f7')
        res.json({result: favorites})
    }catch(err){
        console.log(err)
    }
})


//POST /favorites -- add a movie to the favorites array
router.post('/', async (req,res)=>{
    try{
        const newFave= await db.User.create(req.body)
        res.json({result: newFave})
    }catch(err){
        console.log(err)
    }
})
//DELETE /favorites -- delete a movie from the array
router.delete('/', async (req,res) => {
    try{

        const deletedFavorite = await db.User.deleteOne({'favoriteMovies.id': '6452cbf785d57e0fa68d23f8'})
        res.json({result: "deletedFavorite"})
    }catch(err){
        console.log(err)
    }
})


module.exports= router;

