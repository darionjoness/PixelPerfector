import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    pointsPurchased: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const Orders = mongoose.model('Orders', orderSchema)

export default Orders