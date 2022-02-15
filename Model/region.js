const mongoose = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const regionSchema = new mongoose.Schema({
    regionId : {
        type : ObjectId,
        required : true
    },
    regionName :{
        type : String,
        required:true
    }
});

module.exports = new mongoose.model('Region' , regionSchema);

