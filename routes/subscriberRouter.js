const express = require('express')
// add our router
const subscriberRouter = express.Router()

// require the author controller
const subscriberController = require('../controllers/subscriberController.js')

// handle the GET request to get all subscriber
subscriberRouter.get('/', subscriberController.getAllSubscribers)


// export the router
module.exports = subscriberRouter