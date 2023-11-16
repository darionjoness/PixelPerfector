import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    // Set token to the jwt from the cookie
    token = req.cookies.jwt

    // Check if there is a token
    if(token){
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Set req.user to the decoded userIds user from token payload and use .select to remove password from it
            req.user = await User.findById(decoded.userId).select('-password')

            next()
        } catch (error) {
            // Send 401 unauthorized
            res.status(401)

            // Throw error
            throw new Error('Not authorized, Invalid token')
        }
    }else{
        // Send 401 unauthorized
        res.status(401)
        // Throw new error
        throw new Error('Not authorized, No token')
    }
}) 

export{ 
    protect
}