import express, { urlencoded} from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import cookieParser from "cookie-parser";

dotenv.config()

connectDB()

const app = express()

// Port
const PORT = process.env.PORT || 5000

// Middleware for parsing json data
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cookieParser())

// User routes
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Server started')
})

// Page not found middleware
app.use(notFound)
// Error handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
