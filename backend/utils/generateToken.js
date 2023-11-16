import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    // Create a jwt token with the userId as payload
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: true,
        maxAge: 3600000
    })
}

export default generateToken