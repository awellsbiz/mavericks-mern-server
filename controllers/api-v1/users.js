const express = require('express')
const router = express.Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')


// GET /users - test endpoint
router.get('/', (req, res) => {
	res.json({ msg: 'welcome to the users endpoint' })
})

// POST /users/register - CREATE new user
router.post('/register', async (req, res) => {
	try {
		// check if user exists already
		const findUser = await db.User.findOne({
			email: req.body.email
		})

		// don't allow emails to register twice
		if (findUser) {
			return res.status(400).json({ msg: 'email exists already' })
		}

		// hash password
		const password = req.body.password
		const saltRounds = 12
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		// create new user
		const newUser = new db.User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		})

		await newUser.save()

		// create jwt payload
		const payload = {
			name: newUser.name,
			email: newUser.email,
			_id: newUser.id
		}

		// sign jwt and send back
		const token = jwt.sign(payload, process.env.JWT_SECRET)

		res.json({ token })
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'server error' })
	}
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
	try {
		// try to find user in the db
		const foundUser = await db.User.findOne({
			email: req.body.email
		})

		const noLoginMessage = 'Incorrect username or password'

		// if the user is not found in the db, return and sent a status of 400 with a message
		if (!foundUser) {
			return res.status(400).json({ msg: noLoginMessage })
		}

		// check the password from the req body against the password in the database
		const matchPasswords = bcrypt.compare(req.body.password, foundUser.password)

		// if provided password does not match, return an send a status of 400 with a message
		if (!matchPasswords) {
			return res.status(400).json({ msg: noLoginMessage })
		}

		// create jwt payload
		const payload = {
			name: foundUser.name,
			email: foundUser.email,
			_id: foundUser.id
		}

		// sign jwt and send back
		const token = jwt.sign(payload, process.env.JWT_SECRET)

		res.json({ token })
	} catch (error) {
		console.log(error)
		res.status(500).json({ msg: 'server error' })
	}
})

// GET /auth-locked - will redirect if bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
	// use res.locals.user here to do authorization stuff
	console.log('logged in user:', res.locals.user)
	res.json({ msg: 'welcome to the private route!' })
})

//------RESTFUL CRUD---------
//GET /favorites --Read a list of all favorites 
router.get('/favorites', authLockedRoute, async (req, res) => {
	try{
		const favorites = await db.FavoriteMovie.find({userId: res.locals.user._id})
		res.json({result: favorites})
	} catch (err) {
		console.log(err)
	}
})

//GET /watchlist -- Read all movies that are in the wishList array
router.get('/watchlist',authLockedRoute, async (req,res) => {
    try{
        const findUser= await db.User.find(res.locals.user)
		const watchList = await db.WatchList.find({})
        res.json({result: watchList})
    }catch(err){
        console.log(err)
    }
})

//POST /favorites -- add a movie to the favorites array
router.post('/favorites', authLockedRoute, async (req,res) => {
	try {
		const user = await db.User.findById(res.locals.user._id)
		const newFavorite = await db.FavoriteMovie.create(req.body)
		user.favorites.push(newFavorite)
		await user.save()
		res.json({result: user})
	} catch (error) {
		console.log(error)
	}
})

//POST /watchlist -- add a movie to the favorites array
router.post('/favorites/:id',authLockedRoute, async (req,res)=>{
    try{
		const findUser= await db.User.find(res.locals.user)
		const updateList= await db.WatchList.updateOne(req.params.id)
		findUser.favorites.push(updateList.id)
		
        res.json({result: updatedUser})
    }catch(err){
        console.log(err)
    }
})
//DELETE /favorites -- delete a movie from the array
router.delete('/favorites/:id', async (req,res) => {
    try{
		const findUser= await db.User.find(res.locals.user)
		const deleteFave = await db.FavoriteMovie.updateOne({ _id: findUser}, { $pull: { favorites: { id: req.params.id } } })
		console.log(findUser)
        //const deletedFavorite = await db.User.findOneAndDelete({favoriteMovies: {title: 'Test'},})
        res.json({result: deleteFave})
    }catch(err){
        console.log(err)
    }
})
//DELETE /watchlist/:id --delete a specific movie from the array
router.delete('/favorites/:id', async (req,res) => {
    try{
		const findUser= await db.User.find(res.locals.user)
		const deleteWatch = await db.WatchList.updateOne({ _id: findUser}, { $pull: { watchList: { id: req.params.id } } })
		console.log(findUser)
        //const deletedFavorite = await db.User.findOneAndDelete({favoriteMovies: {title: 'Test'},})
        res.json({result: deleteWatch})
    }catch(err){
        console.log(err)
    }
})
module.exports = router
