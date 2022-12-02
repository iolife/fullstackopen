require("dotenv")

const express = require("express")
const cors = require("cors")
const app = express()
require("express-async-errors")
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")
const loginRouter = require("./controllers/login")
const middleware = require("./middleware/middleware")

logger.info(config.MONGODB_URI, typeof config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message)
  })
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use("/api", userRouter)
app.use("/api", loginRouter)
app.use("/api", middleware.userExtractor, blogRouter)
app.use(unknownEndpoint)
app.use(errorHandler)
module.exports = app
