const mongoose = require("mongoose")

const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    houseNumber: String,
  });

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
        trim: true
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
    address: {
        type: AddressSchema,
        required: false
    }
})

module.exports = new mongoose.model("user",UserSchema)