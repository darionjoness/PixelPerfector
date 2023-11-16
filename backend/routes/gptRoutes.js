import express from 'express'
import { getGptResponse } from '../controllers/gptControllers.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/createresponse', protect, getGptResponse)

export default router

