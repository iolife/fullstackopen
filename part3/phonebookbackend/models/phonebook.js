require('dotenv').config()
const { response } = require('express')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connenting to MongoDb:', error.message)
    })

const phoneBook = new mongoose.Schema({
    name: String,
    number: String
})
phoneBook.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('PhoneBook', phoneBook)
