import express from 'express'
import { register_account, login, get_member_info } from '../controllers/auth'

const router = express.Router()

router.post('/register', register_account)
router.post('/login', login)
router.get('/get_member', get_member_info)

export default router
