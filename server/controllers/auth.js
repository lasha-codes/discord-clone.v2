import jwt from 'jsonwebtoken'
import db from '../database/db.js'
import bcrypt from 'bcryptjs'

export const register_account = async (req, res) => {
  const { username, email, password } = req.body
  const user_exists = await db.member.findUnique({ where: { email } })
  if (user_exists) {
    // TODO: custom discord error
    return res
      .status(403)
      .json({ message: 'User with this email already exists' })
  }
  const hashed_password = await bcrypt.hash(password, 10)
  const created_member = await db.member.create({
    data: {
      username,
      email,
      hashed_password,
    },
  })
  res.status(201).json({ created_member })
  try {
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
