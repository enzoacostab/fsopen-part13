import axios from 'axios'

const loginUrl = '/api/login'
const registerUrl = '/api/users'
const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const register = async (credentials) => {
  const response = await axios.post(registerUrl, credentials)
  return response.data
}

export default { login, register }
