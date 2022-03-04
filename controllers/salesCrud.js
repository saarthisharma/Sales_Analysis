const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")

// joi
const {addOrderValidation} = require("../validations/addOrderValidation")

const User = require("../Model/User")
const OrderModel = require("../Model/order")

// api to add order data
exports.addOrders = async(req,res)=>{
    try {
        const{
            orderPriority,
            orderDate,
            orderId,
            shipDate,
            unitSold,
            unitsPrice,
            unitCost,
            totalRevenue,
            totalCost,
            totalProfit,
            countryId,
            itemId,
            regionId,
            addedViaApi,
            userId

        } = req.body

        let validation = addOrderValidation(req.body);

        if(validation && validation.error == true){
            console.log(validation.message)
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        let add =  new OrderModel({
            orderPriority:orderPriority,
            orderDate:orderDate,
            orderId:orderId,
            shipDate:shipDate,
            unitSold:unitSold,
            unitsPrice:unitsPrice,
            unitCost:unitCost,
            totalRevenue:totalRevenue,
            totalCost:totalCost,
            totalProfit:totalProfit,
            countryId:countryId,
            itemId:itemId,
            regionId:regionId,
            addedViaApi:addedViaApi,
            userId:req.user._id

        })
        let newData = await add.save()
        return responseHandler.handler(res,true, message.customMessages.orderDataAdded,newData, 201)

    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}


// api to update order data
exports.updateOrders = async(req,res)=>{
    try {
        let validation = addOrderValidation(req.body);

        if(validation && validation.error == true){
            console.log(validation.message)
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        // order mongodb object id
        let objectId = req.query.id;
        
        let updateData = await OrderModel.updateOne({_id:objectId , isDeleted : {$exists : false}} , 
            {
                $set:
                    {
                        orderPriority:req.body.orderPriority,
                        orderDate:req.body.orderDate,
                        orderId:req.body.orderId,
                        shipDate:req.body.shipDate,
                        unitSold:req.body.unitSold,
                        unitsPrice:req.body.unitsPrice,
                        unitCost:req.body.unitCost,
                        totalRevenue:req.body.totalRevenue,
                        totalCost:req.body.totalCost,
                        totalProfit:req.body.totalProfit
                    }
            })
            return responseHandler.handler(res,true, message.customMessages.orderDataUpdated,req.body, 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}


// api to soft delete a  data
exports.softDelete = async(req,res)=>{
    try {
        let objectId = req.query.id;
        
        let data = await OrderModel.updateOne({_id:objectId, isDeleted : {$exists : false}},
            {
                $set:
                {
                    isDeleted:1
                }
            })
            return responseHandler.handler(res,true, message.customMessages.orderDataDeleted,[], 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

// api to list all the order of users with paging , filter and sorting
exports.listOrders = async(req,res)=>{
    try {
        let page = req.query.page;

        let rowsPerPage = req.query.rowsPerPage;

        let sortValue =  req.query.sortValue;
                
        let totalDocuments = await OrderModel.find({userId:req.user._id}).count()

        let numberOfPages = Math.floor(totalDocuments / rowsPerPage)

        let query = {userId:req.user._id}

        let sort = {orderId : sortValue}

        let skip = (page - 1) * rowsPerPage

        let limit = rowsPerPage

        let data = await OrderModel.find(query).sort(sort).skip(skip).limit(limit)
        
        return responseHandler.handler(res,true, message.customMessages.paginatedData,data, 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}
