// require mongoose ODM
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	userName: {
		type: String
	},
	password: {
		type: String
	},
	favoriteMovies: [
		{
			_id: {type: String},
			title: {type: String},
			poster: {type: String},
			rating: {type: String},
			releaseDate:{type: String},
			adult: {type: Boolean},
			summary: {type: String}
		}
	],
	watchList: [
		{
			_id: {type: String},
			title: {type: String},
			poster: {type: String},
			rating: {type: String},
			releaseDate:{type: String},
			adult: {type: Boolean},
			summary: {type: String}
		}
	]
	
}, {
	timestamps: true
})

module.exports = mongoose.model('User', UserSchema)