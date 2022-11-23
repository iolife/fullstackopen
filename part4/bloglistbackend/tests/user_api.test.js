const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const helper = require("./test_helper")

beforeEach(async () => {
  await User.deleteMany({})
  helper.initailUsers.map(async (e) => {
    const newUser = new User(e)
    await newUser.save()
  })
})

describe("addition of a new user", () => {
  test("a valid user can be added", async () => {
    const newUser = {
      username: "test",
      password: "test",
      name: "test"
    }
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const result = await User.findOne({ username: newUser.username })
    expect(result.username = newUser.username)
  })
  test("a invalid user can't be added", async () => {
    const newUser = {
      username: "test"
    }
    const newUser2 = {
      username: "tes",
      password: "te"
    }
    const result1 = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result1.body.error).toContain("username or password is empty")

    const result2 = await api
      .post("/api/users")
      .send(newUser2)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result2.body.error).toContain("username or password length less 3")
  })
  test("exist username can not add", async () => {
    await api
      .post("/api/users")
      .send({ username: "test1", password: "test1" })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})