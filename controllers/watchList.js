const router = require('express').Router()
const db = require('../models')

//I need to handle incomming request w routes. 
//do some full crud for movies

// GET /watchList -- array of selected favorite movies 
router.get('/', async (req,res) => {
    try{
        const watchList= await db.User.find({'watchlist.title': 'Test'})
        res.json({result: watchList})
    }catch(err){
        console.log(err)
    }
})


//POST /watchlist -- add a movie to the favorites array
router.post('/', async (req,res)=>{
    try{
        const newWatchList= await db.User.create(req.body)
        res.json({result: newWatchList})
    }catch(err){
        console.log(err)
    }
})
//DELETE /watchlist -- delete a movie from the array
router.delete('/', async (req,res) => {
    try{

        const deletedWatch = await db.User.findOneAndDelete({favoriteMovies: {id: 'abc'}})
        res.json({result: "deletedFavorite"})
    }catch(err){
        console.log(err)
    }
})


module.exports= router;


