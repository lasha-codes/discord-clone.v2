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

  socket.on('delete_request', ({ deleted_request, member_id }) => {
    if (deleted_request.sender_id === member_id) {
      const received_member = connected_members.find((user) => {
        return user.userId === deleted_request.receiver_id
      })
      console.log(received_member)
      if (received_member) {
        socket.to(received_member.socketId).emit('return_delete_request', {
          deleteId: deleted_request.id,
          member: 'receiver',
        })
      }
    } else if (deleted_request.receiver_id === member_id) {
      const sender_member = connected_members.find((user) => {
        return user.userId === deleted_request.sender_id
      })
      console.log('sender_member')
      if (sender_member) {
        socket.to(sender_member.socketId).emit('return_delete_request', {
          deleteId: deleted_request.id,
          member: 'sender',
        })
      }
    }
  })

  socket.on('accept_request', ({ new_friends, sender, requestId }) => {
    const senderUser = connected_members.find((user) => {
      return user.userId === sender.id
    })

    if (senderUser) {
      socket
        .to(senderUser.socketId)
        .emit('return_accept_request', { new_friends, requestId })
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
