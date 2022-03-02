const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const crypto = require("crypto");

const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")

// requiring email sending module
const {signUpVerifyMail} = require("../utils/mails")

// requiring crypto module
const {encryptToken} = require("../helper/cryptoModule")

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

        // verification email process 
        // jwt
        const newPayload = {
            email:email
        }

        const emailVerificationToken = jwt.sign(newPayload , process.env.JWT_SECRET)
        
        // new user
        let creatingNewUser = new User({
            email: email,
            password: hashedPassword,
            verifyEmailToken: emailVerificationToken
        });
        
        let newUser = await creatingNewUser.save()

        await signUpVerifyMail(email,emailVerificationToken)
        
        // jwt
        const payload = {
            _id: newUser._id
        }

        const token = jwt.sign(payload , process.env.JWT_SECRET)
        
        let hashedToken = encryptToken(token);
        
        // saving tokens
        let tokenCollection = new Token({
            token : hashedToken,
            UserId: newUser
        })

        let saveToken =await tokenCollection.save() 
        
        return responseHandler.handler(res,true, message.customMessages.userCreated,emailVerificationToken, 201)
    } catch (error) {
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

exports.emailVerificationApi = async (req,res) => {
    try {
        const{token} = req.headers
        const isverify = jwt.verify(token , process.env.JWT_SECRET ,async function(error , data){
            const decoded = jwt.decode(token)
            if(error){
                return responseHandler.handler(res,false, message.customMessages.emailVerficationError, [], 500)
            }

            let user = await User.findOne({email:decoded.email},{token:token})
            console.log(user)
            if(!user){
                return responseHandler.handler(res,false, message.customMessages.emailVerficationError, [], 500)
            }

            let udpateEmailStatus = await User.updateOne({email:decoded.email,token:token},
                {
                    $set:{emailVerified:true},
                    $unset:{verifyEmailToken:1}
                }
            )       
            return responseHandler.handler(res,true, message.customMessages.emailVerficationSuccess,[], 201)    
        
        })
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
            _id: user._id,
            timestamp: new Date().getTime()
            }

        const token = jwt.sign(payload , process.env.JWT_SECRET)   

        let hashedToken = encryptToken(token);
            
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
        const {token} = req.body

        let validation = tokenValidation(req.body);
        
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        // secret
        const secret = process.env.CRYPTO_SECRET;

        // Calling createHash method
        const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

        const deleteToken = await Token.find({token:hash}).deleteOne().exec()
    
        if(deleteToken.deletedCount == 0){
            return responseHandler.handler(res,false, message.customMessages.TokenDatabaseEmpty, [], 500)
        }
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

        const userId = req.user._id

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
