require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URL
mongoose.connect(url).then(() => {
  console.log("connected to MongoDB")
})
  .catch((error) => {
    console.log("error connenting to MongoDb:", error.message)
  })

const phoneBook = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: function (v) {
      return /\d{2}-\d/.test(v)
    },
    message: props => `${props.value} is not valid phone number!`,
    require: [true, "User phone number required"]

  },
})
phoneBook.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model("PhoneBook", phoneBook)
