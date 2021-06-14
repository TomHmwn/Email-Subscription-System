const mongoose = require("mongoose")

    // defining the subscriber schema
const subscriberSchema = new mongoose.Schema({
    name: {type: String,required: true},
    address: {type: String},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    pdf:{type: String, default: "off"},
    videos:{type: String, default: "off"},
    link:{type: String, default: "off"},
    event:{type: String, default: "off"},
})

const subscriber = mongoose.model("subscriber", subscriberSchema)

module.exports = subscriber