const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const connectDB = require("../config/dbConnection")
connectDB();

const User = require("../Model/User");
const { json } = require("body-parser");
const json2csv = require('json2csv').parse;
const Json2csvParser = require("json2csv").Parser;
const fields = ['email'];
const path = require('path')
const fs = require("fs");
async function csvDownload(){
    try {
        await User.find({isAdmin:{$exists:false}},function(error , users){
            if(error){
                console.log("error",error)
            }
            else{
                let csvData = json2csv(users , {fields})
                fs.writeFile("userCsvData.csv" , csvData , function(error){
                    if(error) throw error;
                    console.log("data written to csv successfully")
                }) 
            }
        }).lean()
    } catch (error) {
    console.log('error :', error);   
    }
}
csvDownload()