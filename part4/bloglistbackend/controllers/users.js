const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.post("/users", async (request, response) => {
  const { username, password, name } = request.body
  if (username === undefined || password === undefined) {
    response.status(400).send({ error: "username or password is empty" })
  }
  if (username.length < 3 || password.length < 3) {
    response.status(400).send({ error: "username or password length less 3" })
  }
  if (await User.findOne({ username })) {
    response.status(400).json({
      error: "username must be unique"
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username: username,
    name: name, passwordHash: passwordHash
  })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})
userRouter.get("/users", async (request, response) => {
  const result = await User.find({})
  response.json(result)
})

module.exports = userRouter