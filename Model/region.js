const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const regionSchema = new mongoose.Schema({
    regionName :{
        type : String,
        required:true
    }
});

module.exports = new mongoose.model('Region' , regionSchema);

