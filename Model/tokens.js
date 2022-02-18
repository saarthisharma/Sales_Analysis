const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    UserId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    }
})

module.exports = new mongoose.model("token",TokenSchema)