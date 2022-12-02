require("dotenv").config()

const http = require("http")
const app = require("./app")
const config = require("./utils/config")
const logger= require("./utils/logger")
const PORT = config.PORT
const server = http.createServer(app)
server.listen(PORT, () => {
  logger.info(`Server runing on port ${PORT}`)
})