const express = require('express')
// add our router
const formRouter = express.Router()

// require the form controller
const formController = require('../controllers/formController.js')

//request a form
formRouter.get('/', formController.getSubscriptionForm)

//confirm a form
formRouter.post('/subscribed', formController.postConfirmSubscription)

// export the router
module.exports = formRouter