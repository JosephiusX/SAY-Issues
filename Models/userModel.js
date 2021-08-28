const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name field required'],
	},
	email: {
		type: String,
		required: [true, 'email field is required'],
		unique: [true, 'email must be unique'],
	},
	password: {
		type: String,
		requires: true,
	},
})
const User = mongoose.model('User', userSchema)

module.exports = User
