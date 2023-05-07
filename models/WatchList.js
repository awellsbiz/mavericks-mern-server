const mongoose = require('mongoose')

const WatchListSchema = new mongoose.Schema({
	id: {
		type: String
	},
	userId: {
        type: String
    },
	title: {
		type: String
	},
	poster_path: {
		type: String
	},
	rating: {
		type: String
	},
	release_date: {
		type: String
	},
	adult: {
		type: Boolean
	},
	overview: {
		type: String
	}
})
module.exports = mongoose.model('WatchList', WatchListSchema)