const res = require("express/lib/response")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const User = require("../Model/User")
const Token = require("../Model/tokens")

exports.userAuthorization = async(req,res,next)=> {
    try {
        // checking token in the header
        const token = req.header("token")
        const tokenExistInDatabase = await Token.findOne({token:token})

        // if token is not valid
        if(!token || !tokenExistInDatabase){
            return res.status(401).send("unauthorized access")
        }

        // verify the token received in the header
        jwt.verify(token,process.env.JWT_SECRET,async function(error,data){
            if(error){
                return res.status(401).send("unauthorized access")
            }
            else{
                
                let user = await User.findOne({"_id":data._id})

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