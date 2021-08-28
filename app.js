const express = require('express')
const app = express()
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const path = require('path')
const User = require('./Models/userModel')
const Phrase = require('./Models/phraseModel')

// const EventEmitter = require('events')
// const myEmitter = new EventEmitter()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.use(express.json()) // allows express middleware for all routes , for json
app.use(express.static(`${__dirname}/public`)) // built in express middleware for rendering static html , set up for views
// app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride('_method'))

const port = process.env.PORT || 3000

// home route
app.get('/', (req, res) => {
	res.send('home route')
})

// document.querySelectorAll('') // Doucment is undefined

/////////////////////////// phrase routes
// read topics (topic Phrases)
app.get('/topics', async (req, res) => {
	const topicArray = [] // set empty array to value
	try {
		const phrases = await Phrase.find() // find all the phrase objects
		for (let phrase of phrases) topicArray.push(phrase.topics) // loop through phrases objects, for each phrase object render the topic and push it to Topic array
		let uniqueTopics = topicArray.filter((item, pos) => topicArray.indexOf(item) == pos) // filtering duplicates from topicArray
		res.render('./phraseView/topics.ejs', {uniqueTopics}) // render topics.ejs and give it value to work with
		// console.log(uniqueTopics)
	} catch (err) {
		console.log(err)
	}
})

// Read phrases associated to a topic
app.get('/topic/:name', async (req, res) => {
	const selectedTopic = req.params.name // take the value of the :name position of the paramiter string

	try {
		const phrases = await Phrase.find({topics: selectedTopic}) // find all phrases in db with values of selectedTopic(the phrase we click on)
		res.render('./phraseView/topic.ejs', {phrases})
		console.log(req.params.name)
	} catch (err) {
		console.log(err)
	}
})

// read phrases route
app.get('/phrases', async (req, res) => {
	try {
		const phrases = await Phrase.find() // pull Phrase collection from db
		res.render('./phraseView/index.ejs', {phrases}) // embed in index.ejs
	} catch (err) {
		console.log(err)
	}
})

// create new phrase using form above
app.post('/phrases', async (req, res) => {
	const phrase = new Phrase({...req.body}) // take object form req.body sent form submission of new phrase form

	try {
		await phrase.save() // wait for creation of phrase then save to db
		res.status(201).redirect('/phrases')
	} catch (err) {
		console.log(err)
	}
})
// render new phrase form
app.get('/phrases/new', (req, res) => {
	res.render('./phraseView/new.ejs')
})

// render phrase by id
app.get('/phrases/:id', async (req, res) => {
	const phrase = await Phrase.findById(req.params.id)
	res.render('./phraseView/show.ejs', {phrase})
})

// render edit phrase by id form
app.get('/phrases/:id/edit', (req, res) => {
	res.render('./phraseView/edit.ejs')
})

// edit phrase by id with form above
app.patch('/phrases/:id', (req, res) => {
	res.send('edit phrase by id')
})

app.delete('/phrases/:id', async (req, res) => {
	const {id} = req.params
	try {
		await Phrase.findByIdAndDelete(id)
		res.redirect('/phrases')
	} catch (err) {
		console.log(err)
	}
})

//////////////////////////////////   user routes
// render register form
app.get('/register', (req, res) => {
	res.render('./userView/register.ejs')
})

// register user with route above
app.post('/register', (req, res) => {
	res.send('regestering user')
})

// render login form
app.get('/login', (req, res) => {
	res.render('./userView/login.ejs')
})

// login user with route above
app.post('/login', (req, res) => {
	res.send('login user')
})

// logout  user route
app.post('/logout', (req, res) => {
	res.send('logged out')
})

app.listen(port, () => {
	console.log(`App running on port ${port}...`)
})

module.exports = app

////////////////////////// talk logic  ////////////////////////////////
