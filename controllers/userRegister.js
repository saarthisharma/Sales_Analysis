const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")


// requiring model
const User = require("../Model/User")
const Token = require("../Model/tokens")

// requiring joi validator
const { userValidation } = require("../validations/userRegisterJoi");

// api for signUp
exports.userRegister = async(req,res)=>{
    try {
        const{email , password, confirmPassword} = req.body

        let validation = userValidation(req.body);

        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        if(password != confirmPassword){
            return responseHandler.handler(res,false, message.customMessages.passwordNotMatch, [], 500)            
        }
        
        // if exist
        let user = await User.findOne({email : email})

        if(user){
            return responseHandler.handler(res,false, message.customMessages.userAlreadyExist, [], 500)   
        }
        
        // hash pwd
        const hashedPassword = await bcrypt.hash(password , Number(process.env.saltRounds))
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword , Number(process.env.saltRounds))
        
        // new user
        let creatingNewUser = new User({
            email: email,
            password: hashedPassword
        });
        
        let newUser = await creatingNewUser.save()
        
        // jwt
        const payload = {
            _id: newUser._id
        }

        const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : '1hr'})
        
        // saving tokens
        let tokenCollection = new Token({
            token : token,
            UserId: newUser
        })

        let saveToken =await tokenCollection.save() 
        
        return responseHandler.handler(res,true, message.customMessages.userCreated,token, 201)
    } catch (error) {
        console.log(error)
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

exports.userLogin= async(req,res)=>{
    try {
        const{email , password} = req.body

        let validation = userValidation(req.body);

        if(validation && validation.error == true){
            console.log("validation successful")
            return responseHandler.handler(res, false, validation.message , [], 422)
        }
        // if exist
        let user = await User.findOne({email:email})
        if(!user){
            return responseHandler.handler(res,false, message.customMessages.notLoggedIn, [], 500)
        }
        console.log(password)
        // hash pwd 
        const hashedPassword = await bcrypt.hash(password , Number(process.env.saltRounds))
        
        console.log(hashedPassword)
        console.log(email)
        console.log("============")
        // authentication
        let emailPasswordMatch = await User.findOne({email:email, password:hashedPassword})

        if (!emailPasswordMatch) {
            return responseHandler.handler(res,false, message.customMessages.notLoggedIn, [], 500)
        }

        const payload = {
            _id: user._id
        }

        const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : '1hr'})
        return responseHandler.handler(res,true, message.customMessages.successLoggedIn,token, 201)        
    } catch (error) {
        console.log(error)
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}