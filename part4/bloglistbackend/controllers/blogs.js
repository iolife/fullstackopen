const express = require("express")
const blogRouter = express.Router()
const Blog = require("../models/blog")
blogRouter.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
blogRouter.post("/blogs", async (request, response) => {
  const newBlog = new Blog(request.body)
  const result = await newBlog.save()
  response.status(201).json(result)
})
blogRouter.get("/blogs/:id", async (request, response) => {
  const result = await Blog.findById(request.params.id)
  response.json(result)
})
blogRouter.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
blogRouter.put("/blogs/:id", async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(result)
})

module.exports = blogRouter