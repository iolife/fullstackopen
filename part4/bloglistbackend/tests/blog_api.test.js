
require("dotenv")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")
const jwt = require("jsonwebtoken")
// beforeEach(async () => {
//   await Blog.deleteMany({})
//   let newBlog = new Blog(helper.initialBlogs[0])
//   await newBlog.save()
//   newBlog = new Blog(helper.initialBlogs[1])
//   await newBlog.save()
// })
describe("when there is initially some blogs saved", () => {
  let token = ""
  beforeEach(async () => {
    await Blog.deleteMany({})
    helper.initialBlogs.map(async (e) => {
      const b = new Blog(e)
      await b.save()
    })
    if (token === "") {
      await User.deleteMany({})
      const user = new User(helper.initailUsers[0])
      await user.save()

      const userForToken = {
        username: user.username,
        id: user._id
      }
      token = jwt.sign(userForToken, process.env.SECRET)
      token = "bearer " + token
    }
  })
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set({ "authorization": token })
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("there are two blogs", async () => {
    const result = await api
      .get("/api/blogs")
      .set({ "authorization": token })

    expect(result.body).toHaveLength(2)
  })

  // test("the first blog is about React patterns", async () => {
  //   const result = await api
  //     .get("/api/blogs")
  //     .set({ "authorization": token })
  //   expect(result.body[0].title).toBe("React patterns")
  // })
})
describe("addition of a new blog", () => {
  let token = ""
  beforeEach(async () => {
    await Blog.deleteMany({})
    helper.initialBlogs.map(async (e) => {
      const b = new Blog(e)
      await b.save()
    })
    if (token === "") {
      await User.deleteMany({})
      const user = new User(helper.initailUsers[0])
      await user.save()

      const userForToken = {
        username: user.username,
        id: user._id
      }
      token = jwt.sign(userForToken, process.env.SECRET)
      token = "bearer " + token
    }
  })
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }
    await api
      .post("/api/blogs")
      .set({ "authorization": token })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api
      .get("/api/blogs")
      .set({ "authorization": token })
      .expect(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    const titles = response.body.map((e) => e.title)
    expect(titles).toContain("React patterns")
  })

  test("blog without likes, it defaults values is 0", async () => {
    const newBlog = {
      title: "like use default",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    }
    await api
      .post("/api/blogs")
      .set("authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api
      .get("/api/blogs")
      .set({ "authorization": token })
      .expect(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    const likes = response.body.map((e) => e.likes)
    expect(likes).toContain(0)
  })

  test("whether the unique identifier attribute name is id", async () => {
    const newBlog = {
      title: "like use default",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    }
    await api
      .post("/api/blogs")
      .set("authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api
      .get("/api/blogs")
      .set({ "authorization": token })
      .expect(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    const likes = response.body.map((e) => e.likes)
    expect(likes).toContain(0)
  })

  test("如果请求数据中缺少title和url属性，后端会以状态代码400 Bad Request响应请求", async () => {
    const newBlog = {
      author: "Michael Chan",
    }

    await api
      .post("/api/blogs")
      .set("authorization", token)
      .send(newBlog)
      .expect(400)
  })
})

describe("deletion of a blog", () => {
  let token = ""
  beforeEach(async () => {
    await Blog.deleteMany({})

    if (token === "") {
      await User.deleteMany({})
      const user = new User(helper.initailUsers[0])
      await user.save()

      const userForToken = {
        username: user.username,
        id: user._id
      }
      token = jwt.sign(userForToken, process.env.SECRET)
      token = "bearer " + token
      helper.initialBlogs.map(async (e) => {
        const b = new Blog(e)
        b.user = user._id
        await b.save()
      })
    }
  })
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", token)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const urls = blogsAtEnd.map(r => r.url)
    expect(urls).not.toContain(blogToDelete.url)
  })
})
describe("update of a blog", () => {
  let token = ""
  beforeEach(async () => {
    await Blog.deleteMany({})

    if (token === "") {
      await User.deleteMany({})
      const user = new User(helper.initailUsers[0])
      await user.save()

      const userForToken = {
        username: user.username,
        id: user._id
      }
      token = jwt.sign(userForToken, process.env.SECRET)
      token = "bearer " + token
      helper.initialBlogs.map(async (e) => {
        const b = new Blog(e)
        b.user = user._id
        await b.save()
      })
    }
  })
  test("succeeds with status code 200 value ", async () => {
    const blogsAtStart = await helper.blogsInDb()
    let newBlog = blogsAtStart[0]
    const result = await api
      .put(`/api/blogs/${newBlog.id}`)
      .set("authorization", token)
      .send({ title: "nee" })
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(result.body.title).toBe("nee")
    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain("nee")
  })
})
afterAll(() => {
  mongoose.connection.close()
})