import express from 'express'
import {
  register_account,
  login,
  get_member_info,
  verify_email,
  verify_member,
} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register_account)
router.post('/login', login)
router.post('/verify_email', verify_email)
router.get('/get_member', get_member_info)
router.get(':id/verify/:token', verify_member)

export default router
