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
const { tokenValidation } = require("../validations/tokenValidation");
const { ProfileValidation } = require("../validations/updateProfileValidation");

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

        const hashedConfirmPassword = hashedPassword
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

        const token = jwt.sign(payload , process.env.JWT_SECRET)
        
        const hashedToken = await bcrypt.hash(token,Number(process.env.saltRounds))
        
        // saving tokens
        let tokenCollection = new Token({
            token : hashedToken,
            UserId: newUser
        })

        let saveToken =await tokenCollection.save() 
        
        return responseHandler.handler(res,true, message.customMessages.userCreated,token, 201)
    } catch (error) {
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

exports.userLogin= async(req,res)=>{
    try {
        const{email , password} = req.body

        let validation = userValidation(req.body);

        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        // if not exist
        let user = await User.findOne({email:email})
        
        if(!user){
            return responseHandler.handler(res,false, message.customMessages.Loginerror, [], 500)
        }

        const passwordMatch = await bcrypt.compare(password , user.password);
        
        if(!passwordMatch){
            return responseHandler.handler(res,false, message.customMessages.Loginerror, [], 500)
        }
        const payload = {
            _id: user._id
            }

        const token = jwt.sign(payload , process.env.JWT_SECRET)   
        
        const hashedToken = await bcrypt.hash(token,Number(process.env.saltRounds))
            
        // saving tokens
        let tokenCollection = new Token({
            token : hashedToken,
            UserId: user._id
        })
        let saveToken =await tokenCollection.save()
        return responseHandler.handler(res,true, message.customMessages.successLoggedIn,token, 201)         
    } catch (error) {
        return responseHandler.handler(res,false, message.customMessages.Loginerror, [], 500)
    }
}


exports.userLogout= async(req,res)=>{
    try {
        // let UserId = mongoose.SchemaTypes.ObjectId;

        const{token} = req.body

        let validation = tokenValidation(req.body);

        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);  
        const UserId = decoded._id 

        const findToken = await Token.findOne({UserId:UserId})
        
        // comparing token with hashed token
        const compareToken = await bcrypt.compare(token,findToken.token)
        
        // deleting token
        const deleteToken = Token.find({UserId:UserId}).deleteOne().exec();
        
        return responseHandler.handler(res,true, message.customMessages.logoutMessage,[], 201)  
    } catch (error) {
        console.log(error)
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

exports.updateProfile= async(req,res)=>{
    try {
        const{firstName,lastName,pinCode,city,street,houseNumber}=req.body

        let validation = ProfileValidation(req.body);

        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        const userId = req.query._id

        const profileUpdate = await User.updateOne(
            {"_id": userId},
            {
                $set:
                {
                    "firstName": firstName,
                    "lastName": lastName,
                    "pinCode": pinCode,
                    "city": city,
                    "street": street,
                    "houseNumber":houseNumber
                }
            }
        )
    
        return responseHandler.profileHandler(res,true, message.customMessages.updateProfile,req.body, 201)

    } catch (error) {
        console.log(error)
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}