const express = require('express') 
const app = express();
const exphbs = require('express-handlebars')
require('./models/index.js')

app.use(express.json())  // replaces body-parser
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public')) // define where static assets live


app.engine('hbs', exphbs({
  defaultlayout: 'main',
  extname: 'hbs'
}))

app.set('view engine', 'hbs')

// set up subscriber routes
const subscriberRouter = require('./routes/subscriberRouter')

// set up form routes
const formRouter = require('./routes/formRouter')

// GET home page
app.get('/', (req, res) => {
    console.log('connected')
    res.render('index')
  })

// GET form page
app.use('/form', formRouter)

// Handle subscriber-management requests
// the author routes are added onto the end of '/subscriber-management'
app.use('/subscriber-management', subscriberRouter)


app.all('*', (req, res) => {  // 'default' route to catch user errors
	res.status(404).render('error', {errorCode: '404', message: 'That route is invalid.'})
})

const port = process.env.PORT || 3000

app.listen(port, () => { 
    console.log('The library app is listening on port', port) 
})


main().catch(console.error);
