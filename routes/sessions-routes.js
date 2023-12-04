import { Router } from 'express'
import { login, logout } from '../controllers/sessions-controller.js'
import { userExtractor } from '../util/middleware.js'

const router = Router()
router.post('/api/login', login)
router.use(userExtractor)
router.delete('/api/logout', logout)

export default router
