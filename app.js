import express from 'express'
import router from './routes/blogs-routes.js'

const app = express()

app.use(express.json())

app.use(router)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

export default app
