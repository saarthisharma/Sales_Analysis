const mongoose = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    orderId: {
        type:Number,
        required:true,
        unique:true
    },
    itemId :{
        type:ObjectId,
        ref :'Item'
    },
    regionId:{
        type:ObjectId,
        ref :'Region',
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    },
    orderPriority:{
        type:String,
        required:true
    },
    shipDate:{
        type:Date,
        required:true
    },
    unitsPrice:{
        type:Number,
        required:true
    },
    unitSold:{
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
    }
});

module.exports = new mongoose.model('Order' , orderSchema);
