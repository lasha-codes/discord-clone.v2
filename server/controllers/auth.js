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
  jwt.sign({ member: created_member }, process.env.JWT_SECRET, (err, token) => {
    if (err) throw err
    res.cookie('token', token).json({ member: created_member })
  })
  try {
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  const { password, email } = req.body
  try {
    const target_member = await db.member.findUnique({ where: { email } })
    if (!target_member) {
      return res
        .status(404)
        .json({ message: 'user with this email does not exist.' })
    }
    const password_check = await bcrypt.compare(
      password,
      target_member.password
    )
    if (password_check) {
      jwt.sign(
        { member: target_member },
        process.env.JWT_SECRET,
        (error, token) => {
          if (error) throw err
          res.cookie('token', token).json({ member: target_member })
        }
      )
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
