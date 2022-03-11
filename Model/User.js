const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: false,
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: false,
        minlength: 8,
    },
    pinCode: {
        type: Number,
        required: false
    },
    city: {
        type:String,
        required: false
    },
    street: {
        type:String,
        required: false
    },
    houseNumber: {
        type:String,
        required: false
    },
    verifyEmailToken: {
        type:String,
        required:true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type:Number,
        default:1
    },
    isAdmin: {
        type:Number,
        default:0
    },
    userType: {
        type:Number,
        default:3
    }
})

module.exports = new mongoose.model("user",UserSchema)