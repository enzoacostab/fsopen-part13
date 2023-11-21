const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const res = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(res)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
    return response.status(400).send(`User validation failed: password: Path \`password\` (\`${body.password}\`) is shorter than the minimum allowed length (3).`)
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    response.status(400).send(error.message)
  }
})

module.exports = usersRouter
