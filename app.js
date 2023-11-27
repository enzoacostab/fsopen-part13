import express from 'express'
import blogsRouter from './routes/blogs-routes.js'
import usersRouter from './routes/users-routes.js'
import loginRouter from './routes/login-routes.js'
import { errorHandler, userExtractor } from './utils/middleware.js'

const app = express()
app.use(express.json())
app.use(loginRouter)
app.use(usersRouter)
app.use(userExtractor, blogsRouter)
app.use(errorHandler)

export default app
