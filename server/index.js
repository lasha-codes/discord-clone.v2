import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import auth from './routes/auth.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use('/auth', auth)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
