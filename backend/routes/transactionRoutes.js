import express from 'express'
import { purchasePoints, usePoints } from '../controllers/transactionControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/purchasePoints', protect, purchasePoints)

router.put('/usePoints', protect, usePoints)

export default router