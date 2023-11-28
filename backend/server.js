import express, { urlencoded} from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import gptRoutes from './routes/gptRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import cors from 'cors'
import connectDB from './config/db.js'
import cookieParser from "cookie-parser"

dotenv.config()

connectDB()

const app = express()

// Port
const PORT = process.env.PORT || 5000

// Middleware for parsing json data
app.use(cors({ origin: 'http://localhost:3000'}))
app.use(express.json({ limit: '50mb' }))
app.use(urlencoded({ extended: true, limit: '50mb' }))

app.use(cookieParser())

// Routes
app.use('/api/ai', gptRoutes)
app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionRoutes)

app.get('/', (req, res) => {
    res.send('Server started')
})

// Page not found middleware
app.use(notFound)
// Error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
