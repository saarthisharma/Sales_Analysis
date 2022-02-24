const res = require("express/lib/response")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const crypto = require("crypto");

const User = require("../Model/User")
const Token = require("../Model/tokens");
const e = require("express");

exports.userAuthorization = async(req,res,next)=> {
    try {
        const token = req.header("token")

        const secret = process.env.CRYPTO_SECRET;
        
        const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

        const matchToken = await Token.findOne({token:hash})

        console.log('matchToken :', matchToken);

        if(hash == matchToken.token){

            // verify the token received in the header
            jwt.verify(token,process.env.JWT_SECRET,async function(error,data){
                if(error){
                    return res.status(401).send("unauthorized access")
                }
                else{
                    let user = await User.findOne({"_id":data._id})
                    console.log("===>",user)

                // user must logged in to update
                // if not logged in send error
                    if(!user){
                        return res.status(401).send("unauthorized access")
                    }
                req.user = user
                req.token = token
                next()
            }
        });

        }
        
    } catch (error) {
        console.log(error)
        return res.status(401).send("unauthorized access")
    }
}






// // // getting userId from token
        // const decoded = jwt.verify(token,process.env.JWT_SECRET);  
        // const userId = decoded._id 
        // console.log("userId",userId)

        // const findToken = await Token.find({UserId:userId})
        // console.log("===>",findToken)

        
        // console.log("------>")