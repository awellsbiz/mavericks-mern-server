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
			_id: '',
			title: '',
			poster: '',
			rating: '',
			releaseDate:'',
			adult: true,
			summary: ''
		}
	],
	watchList: [
		{
			_id: '',
			title: '',
			poster: '',
			rating: '',
			releaseDate:'',
			adult: true,
			summary: ''
		}
	]
}, {
	timestamps: true
})

module.exports = mongoose.model('User', UserSchema)