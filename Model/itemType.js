const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    itemName :{
        type : String,
        required : true
    }
});

module.exports = new mongoose.model('Item' , itemSchema);