const express = require('express') 
const app = express();

// set up author routes
const subscriberRouter = require('./routes/subscriberRouter')

// GET form page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public' +'/layout/'+ 'index.html')//send form to browser
})

// Handle subscriber-management requests
// the author routes are added onto the end of '/subscriber-management'
app.use('/subscriber-management', subscriberRouter)

const port = process.env.PORT || 3000

app.listen(port, () => { 
    console.log('The library app is listening on port', port) 
})
