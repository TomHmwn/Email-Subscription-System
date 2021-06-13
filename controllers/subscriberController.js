//link to subscriber model
const subscribers = require('../models/subscriber')

// handle request to get all authors
const getAllSubscribers = (req, res) => {
    res.send(subscribers) // send list to browser
}

module.exports = {
getAllSubscribers

}