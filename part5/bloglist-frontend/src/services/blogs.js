import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  console.log("gt", token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}
const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addBlog }