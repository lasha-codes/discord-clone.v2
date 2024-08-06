import express from 'express'
import {
  register_account,
  login,
  get_member_info,
  verify_email,
} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register_account)
router.post('/login', login)
router.get('/get_member', get_member_info)
router.post('/verify_email', verify_email)

export default router
