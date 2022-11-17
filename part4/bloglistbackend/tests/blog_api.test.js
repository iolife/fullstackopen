const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})
  let newBlog = new Blog(helper.initialBlogs[0])
  await newBlog.save()
  newBlog = new Blog(helper.initialBlogs[1])
  await newBlog.save()
})
describe("when there is initially some blogs saved", () => {

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(2)
  })

  test("the first blog is about React patterns", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].title).toBe("React patterns")
  })
})
describe("viewing a specific blog", () => { })
describe("addition of a new blog", () => {

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api
      .get("/api/blogs")
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
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api
      .get("/api/blogs")
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
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    const response = await api
      .get("/api/blogs")
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
      .send(newBlog)
      .expect(400)
  })
})

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
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
  test("succeeds with status code 200 value ", async () => {
    const blogsAtStart = await helper.blogsInDb()
    let newBlog = blogsAtStart[0]
    const result = await api
      .put(`/api/blogs/${newBlog.id}`)
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