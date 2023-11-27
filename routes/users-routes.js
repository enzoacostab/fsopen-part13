import { Router } from 'express'
import { getUsers, createUser, updateUser } from '../controllers/users-controller.js'
import { userExtractor } from '../utils/middleware.js'

const router = Router()
router.post('/api/users', createUser)
router.get('/api/users', userExtractor, getUsers)
router.put('/api/users/:username', userExtractor, updateUser)

export default router
