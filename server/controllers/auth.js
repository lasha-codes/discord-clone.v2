import jwt from 'jsonwebtoken'
import db from '../database/db.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export const register_account = async (req, res) => {
  const { username, email, password, nickname, birth_date } = req.body
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
      password: hashed_password,
      display_name: nickname,
      birth_date,
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

export const get_member_info = async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
    const { member } = tokenData
    if (err) {
      return res.status(500).json({ error: err })
    }
    res.status(200).json({ member })
  })
  try {
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const verify_email = async (req, res) => {
  const { email } = req.body
  try {
    const sendEmail = async (email, subject, text) => {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        post: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
      })
    }

    const memberExists = await db.member.findUnique({ where: { email: email } })

    const created_token = await db.token.create({
      data: {
        userId: memberExists.id,
        token: crypto.randomBytes(32).toString('hex'),
      },
    })

    const url = `${process.env.BASE_URL}/users/${memberExists.id}/verify/${created_token.token}`
    await sendEmail(email, 'Verify Email', url)

    res
      .status(201)
      .json({ message: 'An email sent to your account please verify' })

    console.log('Email sent successfully')
  } catch (err) {
    console.log('Email not sent')
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

export const verify_member = async (req, res) => {
  try {
    const user = await db.member.findUnique({ where: { id: req.params.id } })
    if (!user) {
      return res.status(400).json({ message: 'invalid link' })
    }

    const token = await db.token.findUnique({
      where: {
        userId: user.id,
        token: req.params.token,
      },
    })
    if (!token) return res.status(400).json({ message: 'invalid link' })

    await db.member.update({ where: { id: user.id }, data: { verified: true } })
    await db.token.delete({ where: { id: token.id } })

    res.status(200).json({ message: 'Email verified successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.log(err.message)
  }
}
