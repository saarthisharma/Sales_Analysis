const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const dotenv = require("dotenv")
const path = require("path");
dotenv.config({path : "../.env"})

// requiring database
const connectDB = require("../config/dbConnection");
connectDB();
const User = require("../Model/User")
const Token = require("../Model/tokens");

const socketTokenAuthentication = async(token)=>{
    try {
        const findToken = await Token.find({})
        
        const secret = process.env.CRYPTO_SECRET;
        
        const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

        const matchTokenInDb = await Token.findOne({token:hash})
        
        if(matchTokenInDb == null){
            return false
        }
        if(hash == matchTokenInDb.token){
            const isverify = jwt.verify(token , process.env.JWT_SECRET ,async function(error){
                if(error){
                    console.log(error)
                }
            })
            return true
        }
        } catch (error) {
            console.log(error)
        }
}
module.exports = {
    socketTokenAuthentication
}
