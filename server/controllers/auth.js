import jwt from 'jsonwebtoken'
import db from '../database/db.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export const register_account = async (req, res) => {
  const { username, email, password, nickname, birth_date } = req.body
  const user_exists = await db.member.findUnique({ where: { email } })
  if (user_exists) {
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
    const target_member = await db.member.findUnique({
      where: { email },
    })
    if (!target_member) {
      return res
        .status(200)
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
    } else {
      res.json({ message: 'Provided password is incorrect.' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const get_member_info = async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.json({ member: null })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, tokenData) => {
    const {
      member: { id },
    } = tokenData
    if (err) {
      return res.status(500).json({ error: err })
    }
    const memberInDb = await db.member.findUnique({ where: { id } })
    if (!memberInDb) {
      return res.status(200).json({ member: null })
    } else {
      return res.status(200).json({ member: memberInDb })
    }
  })
  try {
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const verify_email = async (req, res) => {
  const { email, auto_mail } = req.body
  const { token } = req.cookies
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

    const {
      member: { email: user_email },
    } = jwt.verify(token, process.env.JWT_SECRET)

    const memberExists = email
      ? await db.member.findUnique({ where: { email: email } })
      : await db.member.findUnique({ where: { email: user_email } })

    const token_exists = await db.token.findFirst({
      where: { userId: memberExists.id },
    })

    let created_token

    if (token_exists) {
      created_token = token_exists
    } else {
      created_token = await db.token.create({
        data: {
          userId: memberExists.id,
          token: crypto.randomBytes(32).toString('hex'),
        },
      })
    }

    const url = `${process.env.BASE_URL}/users/${memberExists.id}/verify/${created_token.token}`
    if (auto_mail && !email) {
      const {
        member: { email },
      } = jwt.verify(token, process.env.JWT_SECRET)
      const target_member = await db.member.findUnique({ where: { email } })

      const new_url = `${process.env.BASE_URL}/users/${target_member.id}/verify/${created_token.token}`

      if (target_member) {
        await sendEmail(target_member.email, 'Verify Email', new_url)
      } else {
        res.json({
          message:
            'User with the registered email does not exist in our database.',
        })
      }
    } else {
      await sendEmail(email, 'Verify Email', url)
    }

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

export const get_token = async (req, res) => {
  const { token } = req.cookies

  try {
    if (!token) {
      return res.status(200).json({ message: 'Unauthorized request' })
    }
    const {
      member: { id },
    } = jwt.verify(token, process.env.JWT_SECRET)

    const members_email_token = await db.token.findFirst({
      where: { userId: id },
    })

    if (!members_email_token) {
      return res.status(200).json({ token: null })
    } else {
      return res.status(200).json({ token: members_email_token })
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const send_friend_request = async (req, res) => {
  const { receiver_username, sender_id } = req.body
  try {
    const receiver = await db.member.findUnique({
      where: { username: receiver_username },
    })
    if (!receiver) {
      return res.status(200).json({
        error_message:
          "Hm, that didn't work. Double-check that the username is correct.",
      })
    }

    const already_sent = await db.requests.findFirst({
      where: { sender: sender_id, receiver: receiver.id },
    })

    if (already_sent) {
      return res.status(200).json({
        error_message: "You've already have sent friend request to that user.",
      })
    }

    const receiver_sent = await db.requests.findFirst({
      where: { sender: receiver.id, receiver: sender_id },
    })

    if (receiver_sent) {
      const new_friends = await db.friends.create({
        data: {
          first_user: receiver.id,
          second_user: sender_id,
        },
      })

      await db.requests.delete({ where: { id: receiver_sent.id } })

      return res.status(200).json({
        message:
          'This user has already sent u a friend request u are now friends :).',
        new_friends,
      })
    }
    const created_request = await db.requests.create({
      data: {
        sender: sender_id,
        receiver: receiver.id,
      },
    })

    return res.status(200).json({
      message: 'Friend request to this user has been sent!',
      created_request,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const get_pending_requests = async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.json({ message: 'Unauthorized request' })
  }
  try {
    const {
      member: { id },
    } = jwt.verify(token, process.env.JWT_SECRET)
    const sendRequests = await db.requests.findMany({ where: { sender: id } })
    const receivedRequests = await db.requests.findMany({
      where: { receiver: { id } },
    })

    res.status(200).json({ send: sendRequests, received: receivedRequests })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
