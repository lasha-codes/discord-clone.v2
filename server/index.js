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

let connected_members = []

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:5173' } })

io.on('connection', (socket) => {
  socket.on('get_user_data', (data) => {
    const { userId } = data
    const userExists = connected_members.find((member) => {
      return member.socketId === socket.id
    })
    if (!userExists) {
      connected_members = connected_members.filter((member) => {
        return member.userId !== userId
      })
      connected_members.push({ userId, socketId: socket.id })
    }
    console.log(connected_members)
  })

  socket.on('get_request', ({ receiver_id, request }) => {
    console.log('request')
    const connected_user = connected_members.find((user) => {
      return user.userId === receiver_id
    })
    if (connected_user) {
      socket
        .to(connected_user.socketId)
        .emit('push_request', { receiver_id, request })
    }
  })

  socket.on('disconnect', () => {
    connected_members = connected_members.filter((member) => {
      return member.socketId !== socket.id
    })
    console.log(connected_members)
  })
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
