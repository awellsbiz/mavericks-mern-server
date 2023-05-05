const mongoose = require('mongoose')

const WatchListSchema = new mongoose.Schema({
	tmdbId: {
		type: String
	},
	title: {
		type: String
	},
	poster: {
		type: String
	},
	rating: {
		type: String
	},
	releaseDate: {
		type: String
	},
	adult: {
		type: Boolean
	},
	summary: {
		type: String
	}

})
module.exports = mongoose.model('WatchList', WatchListSchema)