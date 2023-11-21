const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const token = request.headers.authorization
  if (token) {
    request.token = token.split(' ')[1]
  }
  next()
}

const userExtractor = async (request, response, next) => {
  let decodedToken
  const token = request.token
  if (request.token) {
    try {
      decodedToken = jwt.verify(token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      request.user = user
    } catch {
      return response.status(401).json({ error: 'token invalid' })
    }
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
