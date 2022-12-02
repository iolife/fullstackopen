const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]
const nonExistingId = async () => {
  const blog = new Blog({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const initailUsers = [
  {
    username: "test1",
    name: "test1",
    password: "test1"
  },

  {
    username: "test2",
    name: "test2",
    password: "test2"
  },
]
const UsersInDb = async () => {
  const users = User.find({})
  return (await users).map(e => e.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb,
  initailUsers, UsersInDb
}