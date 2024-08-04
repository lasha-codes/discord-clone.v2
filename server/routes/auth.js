import express from 'express'
import { register_account, login } from '../controllers/auth'

const router = express.Router()

router.post('/register', register_account)
router.post('/login', login)

export default router
