import express from 'express'
import { register_account } from '../controllers/auth'

const router = express.Router()

router.post('/', register_account)

export default router
