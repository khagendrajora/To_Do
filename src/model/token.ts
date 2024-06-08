import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400

    }
})

const Token = mongoose.model('Token', tokenSchema)
export default Token

