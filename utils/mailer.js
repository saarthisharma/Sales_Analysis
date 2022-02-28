const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const ejs  = require("ejs")
app.set("view engine", "ejs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });
  return transporter;
};
  const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  const response = await emailTransporter.sendMail(emailOptions);
  console.log('response :', response);
}

ejs.renderFile('../views/index.ejs', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        sendEmail({
        subject: "Test",
        text: "I am sending an email from nodemailer!",
        to: "isaarthisharma@gmail.com",
        from: process.env.EMAIL,
        generateTextFromHTML: true,
        html: data
        });
    }
})




// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const { response } = require("express");
// const OAuth2 = google.auth.OAuth2;

// // setting up OAUth client
// const oauth2Client = new OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     "https://developers.google.com/oauthplayground"
//   );

// oauth2Client.setCredentials({
//    refresh_token: process.env.REFRESH_TOKEN
//  });

// // now we need refresh token to generate access token
// const accessToken = oauth2Client.getAccessToken()

// // To send emails we need a transporter object
// const smptTransport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       accessToken,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: process.env.REFRESH_TOKEN
//     }
// });

// // give our email some content 
// const mailOptions = {
//     subject: "sending mail using oauth",
//     text: "I am sending an email from nodemailer!",
//     to: "isaarthisharma@gmail.com",
//     from: process.env.EMAIL,
//     generateTextFromHTML: true,
//     html: "<b>Hey sending mail using google api and smpt server</b>"
// }

// // sending our email using sendmail method
// smptTransport.sendMail(mailOptions , (error,response) => {
//     error ? console.log(error) : console.log(response)
//     smptTransport.close
// })
