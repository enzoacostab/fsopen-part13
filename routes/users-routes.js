import { Router } from 'express'
import { getUsers, createUser, updateUser, getUser } from '../controllers/users-controller.js'
import { userExtractor } from '../util/middleware.js'

const router = Router()
router.post('/api/users', createUser)
router.use(userExtractor)
router.get('/api/users', getUsers)
router.get('/api/users/:id', getUser)
router.put('/api/users/:username', updateUser)

export default router
