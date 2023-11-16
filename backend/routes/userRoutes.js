import express from "express";
import { registerUser, loginUser, logoutUser, deleteUser, getProfile, updateProfile } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

router.delete('/delete', protect, deleteUser)

router.route('/profile').get(protect, getProfile).put(protect, updateProfile)


export default router