require("dotenv").config()
const logger = require("../utils/logger")
const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl).then(() => logger.info("conneted to mongo"))
  .catch(error => logger.error(error.message))
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model("Blog", blogSchema)
