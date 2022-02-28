const ejs  = require("ejs")
const express = require("express");
const { gmail } = require("googleapis/build/src/apis/gmail");
const app = express();
app.set("view engine", "ejs");
// const mailerFunctionality = require("./mailer")
const {sendEmail} = require("./mailer")

// requiring constants
// const constants = require("../utils/constants")

// signup verification email
const signUpVerifyMail = async (email, token) =>{
    let url = "http://localhost:3000/verifyemail/"+token

    ejs.renderFile("C:/Users/rishi/DEVELOPMENT/SELF_PRACTICE_PROJECTS/Sales_Analysis/views/templates/signupVerify.ejs" , {URL : url}, function(error , data){
        if(error){
            console.log('error :', error);
        }
        else{
            console.log(data)
            sendEmail({
                subject: "Test",
                text: "testing verification email",
                to: "isaarthisharma@gmail.com",
                from: process.env.EMAIL,
                generateTextFromHTML: true,
                html: data
            });

            console.log("export mail is working")
        }
    })   
}

module.exports = {
    signUpVerifyMail
}

