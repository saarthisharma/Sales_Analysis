const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    }
});

module.exports = new mongoose.model('Country' , countrySchema);
