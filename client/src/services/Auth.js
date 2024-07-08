import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    saveToken(res.data.passwordDigest)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}

const saveToken = (token) => {
  localStorage.setItem('token', token)
}

//module.exports = {
//SignInUser,
// RegisterUser,
//  CheckSession
//}
