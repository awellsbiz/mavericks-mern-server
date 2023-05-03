const router = require('express').Router()
const db = require('../models')

//I need to handle incomming request w routes. 
//do some full crud for movies

// GET /favorites -- array of selected favorite movies 
router.get('/', async (req,res) => {
    try{
        const favorites= await db.User.find({'favoriteMovies.title': 'Test'})
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

        const deletedFavorite = await db.User.findOneAndDelete({favoriteMovies: {id: 'abc'}})
        res.json({result: "deletedFavorite"})
    }catch(err){
        console.log(err)
    }
})


module.exports= router;

