const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const OrderSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    orderPriority:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    },
    orderId: {
        type:Number,
        required:true,
        unique:true
    },
    shipDate:{
        type:Date,
        required:true
    },
    unitSold:{
        type:Number,
        required:true
    },
    unitsPrice:{
        type:Number,
        required:true
    },
    unitCost:{
        type:Number,
        required:true,
    },
    totalRevenue:{
        type:Number,
        required:true
    },
    totalCost:{
        type:Number,
        required:true
    },
    totalProfit:{
        type:Number,
        required:true
    },
    countryId: {
        type:ObjectId,
        required:true
    },
    itemId :{
        type:ObjectId,
        required:true
    },
    regionId:{
        type:ObjectId,
        required:true
    },
});

module.exports = new mongoose.model('Order' , OrderSchema);
