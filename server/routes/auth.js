import express from 'express'
import {
  register_account,
  login,
  get_member_info,
  verify_email,
  verify_member,
  get_token,
  send_friend_request,
  get_pending_requests,
} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register_account)
router.post('/login', login)
router.post('/verify_email', verify_email)
router.post('/send_friend_request', send_friend_request)
router.get('/get_member', get_member_info)
router.get('/:id/verify/:token', verify_member)
router.get('/get_token', get_token)
router.get('/get_pending_requests', get_pending_requests)

export default router
