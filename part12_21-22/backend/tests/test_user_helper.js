const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const loginToken = async (username, password) => {

  const response = await api
    .post('/api/login')
    .send({username: username, password: password})

  return `Bearer ${response.body.token}`

}

module.exports = {
  usersInDb,
  loginToken,
}