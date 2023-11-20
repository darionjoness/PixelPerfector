import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {  
    // Get name and password from body  
    const { email, password } = req.body

    // Check if user exists in db
    const userExists = await User.findOne({ email })

    // if user exists send error
    if(userExists){
        res.status(404)
        throw new Error('User already exists')
    }

    // Create new user with email and password
    const newUser = await User.create({
        email,
        password,
        purchaseTokens: 1
    })

    // Check if user got created properly
    if(newUser){
        // Run generateToken and pass in res and newUser id
        generateToken(res, newUser._id)

        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            purchaseTokens: newUser.purchaseTokens
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }


})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // Grab email and password from the body
    const { email, password } = req.body

    // Get the user using the email
    const user = await User.findOne({email})

    // If there is a user and matchPassword returns true
    if(user && (await user.matchPassword(password))){
        // Generate JWT token
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id,
            email: user.email,
            purchaseTokens: user.purchaseTokens
        })
    }else{
        res.status(401)

        throw new Error('Invalid email or password')
    }
})

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    // Destroy the cookie, logging the user out
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    
    res.status(200).json({ message: 'User Logged Out' })

})

// @desc    DELETE user
// @route   DELETE /api/users/delete
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    // Get the id from the current user
    const { _id } = req.user

    if(!_id){
        // Send a 400 error
        res.status(400)
        // Throw new error
        throw new Error('User Id is required')
    }

    const result = await User.deleteOne({ _id })

    if(result.deletedCount === 0){
        // Send not found 404 error
        res.status(404)

        // Throw new error
        throw new Error('User not found')
    }else{
        // Destory cookie
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        // Send 200 response with message
        res.status(200).json({ message: 'User deleted successfully' })
    }


})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    // Create a new object with the current user info
    const user = {
        id: req.user._id,
        email: req.user.email,
        purchaseTokens: req.user.purchaseTokens
    }

    // Respond with a 200, and the user
    res.status(200).json(user)
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    // Find the current user by id
    const user = await User.findById(req.user._id)

    // Check if there is a user
    if(user){

        // If email is in body the change email, else keep the same
        user.email = req.body.email || user.email

        // If password is sent in body
        if(req.body.password){
            // Change password
            user.password = req.body.password
        }

        // Save the new user
        const updatedUser = await user.save()

        // Send a 200 success with new info
        res.status(200).json({
            id: updatedUser._id,
            email: updatedUser.email
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }

})


export {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    getProfile,
    updateProfile
}


