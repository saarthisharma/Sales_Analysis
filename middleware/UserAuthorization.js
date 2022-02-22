const res = require("express/lib/response")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const User = require("../Model/User")
const Token = require("../Model/tokens")

exports.userAuthorization = async(req,res,next)=> {
    try {
        // checking token in the header
        const token = req.header("token")
        console.log("token=======>",token)

        // // getting userId from token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);  
        const userId = decoded._id 
        console.log("userId",userId)

        const findToken = await Token.findOne({UserId:userId})
        console.log("===>",findToken)
        
        // comparing token with hashed token
        const compareToken = await bcrypt.compare(token,findToken.token)
        console.log(compareToken)

        console.log("==========>")

        // if token is not valid
        if(!token || !compareToken){
            return res.status(401).send("unauthorized access")
        }
        console.log("------>")

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
        
    } catch (error) {
        console.log(error)
        return res.status(401).send("unauthorized access")
    }
}