require("dotenv").config()

const logger = require("./utils/logger")
const express = require("express")
const cors = require("cors")
const app = express()
const blogRouter = require("./controllers/blogs")

app.use(cors())
app.use(express.json())
app.use("/api", blogRouter)
const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server runing on port ${PORT}`)
})