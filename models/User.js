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
	favorites: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'FavoriteMovie'
		}
	],
	watchList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'WatchList'
		}
	]
}, {
	timestamps: true
})

module.exports = mongoose.model('User', UserSchema)

