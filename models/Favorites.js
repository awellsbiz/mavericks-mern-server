const mongoose = require('mongoose')

const FavoriteMovieSchema = new mongoose.Schema({
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
module.exports = mongoose.model('FavoriteMovie', FavoriteMovieSchema)