import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import auth from './routes/auth.js'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use('/auth', auth)

const connected_members = []

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } })

io.on('connection', (socket) => {
  socket.on('get_user_data', (data) => {
    const { userId } = data
    const userExists = connected_members.find((member) => {
      return member === userId
    })
    if (!userExists) {
      connected_members.push(userId)
    }
    console.log(connected_members)
  })
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
