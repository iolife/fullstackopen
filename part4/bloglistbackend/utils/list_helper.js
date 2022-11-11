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
  blogs.map((blog) => { })
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}