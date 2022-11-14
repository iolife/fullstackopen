const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  return blogs.reduce((fisrt, second) => {
    fisrt.likes += second.likes
    return fisrt
  }, { likes: 0 }).likes

}
const favoriteBlog = (blogs) => {
  return blogs.reduce((first, second) => first.likes > second.likes ? first : second, {})
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const m = new Map()
  blogs.forEach(element => {
    if (m.has(element.author)) {
      let partBlog = m.get(element.author)
      partBlog.blogs++
      m.set(element.author, partBlog)
    } else {
      m.set(element.author, { author: element.author, blogs: 1 })
    }
  })
  let list = []
  m.forEach(e => list.push(e))
  return list.sort((e1, e2) => {
    if (e1.blogs < e2.blogs) {
      return 1
    } else {
      if (e1.blogs > e2.blogs)
        return -1
    }
    return 0
  })[0]
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const m = new Map()
  blogs.forEach(element => {
    if (m.has(element.author)) {
      let partBlog = m.get(element.author)
      partBlog.likes = partBlog.likes + element.likes
      m.set(element.author, partBlog)
    } else {
      m.set(element.author, { author: element.author, likes: element.likes })
    }
  })
  let list = []
  m.forEach(e => list.push(e))
  return list.sort((e1, e2) => {
    if (e1.likes < e2.likes) {
      return 1
    } else {
      if (e1.likes > e2.likes)
        return -1
    }
    return 0
  })[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
