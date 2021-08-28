const mongoose = require('mongoose')

const phraseSchema = new mongoose.Schema({
	phrase: {
		type: String, // one phrase
		required: [true, 'PHRASE IS REQUIRED'],
		trim: true,
		unique: true, // only one of a kind is allowed
	},
	topics: {
		type: String, // 1 topic at a time for now
		required: [true, 'AT LEAST ONE TOPIC REQUIRED'],
		trim: true,
	},
})
const Phrase = mongoose.model('Phrase', phraseSchema)

module.exports = Phrase
