import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  res.status(500).json({ error: error.message })

  next(error)
}

export const userExtractor = async (req, res, next) => {
  const token = req.get('authorization')
  if (token && token.startsWith('Bearer ')) {
    try {
      const decodedToken = jwt.verify(token.substring(7), process.env.SECRET)
      const user = await User.findByPk(decodedToken.id)
      req.user = user
    } catch (error) {
      console.error(error.message)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}
