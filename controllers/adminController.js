const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")

const User = require("../Model/User")
const OrderModel = require("../Model/order")


// api for admin user can see all users order data
exports.adminGettingData = async(req,res)=>{
    try {
            let page = req.query.page;

            let rowsPerPage = req.query.rowsPerPage;

            let sortValue =  req.query.sortValue;
                    
            let totalDocuments = await OrderModel.find().count()

            let numberOfPages = Math.floor(totalDocuments / rowsPerPage)

            let sort = {orderId : sortValue}

            let skip = (page - 1) * rowsPerPage

            let limit = rowsPerPage

            let data = await OrderModel.find().sort(sort).skip(skip).limit(limit)

            return responseHandler.handler(res,true, message.customMessages.paginatedData,data, 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)     
    }
}

// admin activate/deactivate users api
exports.adminManageUsers = async(req,res)=>{
    try {
        let data = await User.findOne({_id:req.query.id})
        if(data.isActive){
            deActivationMessage = "user deactivate successfully"
            await User.updateOne({_id:req.query.id},
                {
                    $set:
                    {
                        isActive:0
                    }
                }
                )
                return responseHandler.handler(res,true,deActivationMessage,[], 201)
            }
            else{
                ActivationMessage = "user activate successfully"
                await User.updateOne({_id:req.query.id},
                    {
                        $set:
                        {
                            isActive:1
                        }
                    }
                    )
                    return responseHandler.handler(res,true,ActivationMessage,[], 201)
            }
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

// api for admin user fetching all other users
exports.adminListUsers = async(req,res)=>{
    try {
        let data = await User.find({isAdmin : {$exists : false}})
        
        return responseHandler.handler(res,true, message.customMessages.paginatedData,data, 201)
    } catch (error) {
        console.log('error :', error);
        
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}
