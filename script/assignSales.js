const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const connectDB = require("../config/dbConnection")
connectDB();

const OrderModel = require("../Model/order")

const userArray = ["62175cb5e96065e3ab4a02fe" , "62175cc2e96065e3ab4a0303" , "62175ccce96065e3ab4a0308" , "62175cd7e96065e3ab4a030d"]

async function assignUser(){
    try {
        let fetchOrderId = await OrderModel.find({userId : {$exists : false}}).limit(300000);
        
        fetchOrderId.map( async (element) => {
            const randomUserId = userArray[Math.floor(Math.random() * userArray.length)];
            let response = await OrderModel.findOneAndUpdate({_id : element._id }, {userId : randomUserId});
            console.log(response)
        });
    } catch (error) {
        console.log("error-->", error);
    }
    
}
assignUser()