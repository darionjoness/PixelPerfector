import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    purchaseTokens: {
        type: Number,
    }
}, {
    timestamps: true
})

// Runs everytime password is changed before saving it
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    // Generate a salte
    const salt = await bcrypt.genSalt(10)

    // Hash password
    this.password = await bcrypt.hash(this.password, salt)
})

// Create a method called matchPassword that takes in a password
userSchema.methods.matchPassword = async function(enteredPassword){
    // Use bcrypt to compare passwords
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User

