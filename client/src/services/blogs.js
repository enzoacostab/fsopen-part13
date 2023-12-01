import axios from 'axios'

const baseUrl = '/api/blogs'
const getAll = async (auth) => {
  try {
    const request = await axios.get(baseUrl, auth)
    return request.data
  } catch (e) {
    console.error(e)
  }
}
const create = async (data, auth) => {
  try {
    const request = await axios.post(baseUrl, data, auth)
    return request.data
  } catch (e) {
    console.error(e)
  }
}
const like = async (data, auth) => {
  try {
    const request = await axios.put(`${baseUrl}/${data.id}`, data, auth)
    return request.data
  } catch (e) {
    console.error(e)
  }
}
const remove = async (id, auth) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`, auth)
  } catch (e) {
    console.error(e)
  }
}

export default { getAll, create, like, remove }
