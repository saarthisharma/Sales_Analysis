// const crypto = require("crypto");

// const algorithm = "aes-256-cbc-hmac-sha256"; 

// // generate 16 bytes of random data
// const initVector = crypto.randomBytes(16);

// // protected data
// const message = "hey this is chair";

// // console.log("crypto.getCiphers()-->", JSON.stringify(crypto.getCiphers()));

// // secret key generate 32 bytes of random data
// const Securitykey = crypto.randomBytes(32);

// // the cipher function
// const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// // encrypt the message
// // input encoding
// // output encoding
// let encryptedData = cipher.update(message, "utf-8", "hex");

// encryptedData += cipher.final("hex");

// console.log("Encrypted message: " + encryptedData);

// // // the decipher function
// // const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

// // let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

// // decryptedData += decipher.final("utf8");

// // console.log("Decrypted message: " + decryptedData);



// const crypto = require('crypto');
//     // Defining key
//         const secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE2NmY1YTNmYzBkNjM2NWU0Njk2MTkiLCJ0aW1lc3RhbXAiOjE2NDU2Mzc3MTg5MjQsImlhdCI6MTY0NTYzNzcxOH0.4vduuX3Qd0wv13sIzcmu0JicFeZYw1FTNrJYSdeUrtw";
//         // const secret = "hey"
//         // Calling createHash method
//         const hash = crypto.createHash('sha256', secret).update('encryption').digest('hex');

//         console.log(hash);




// const crypto = require("crypto");
// let encryptToken = (token) =>{
//     const algorithm = "aes-256-cbc"; 

//     // generate 16 bytes of random data
//     const initVector = crypto.randomBytes(16);

//     // protected data
//     // const message = "This is a secret message";

//     // secret key generate 32 bytes of random data
//     const securitykey = crypto.randomBytes(32);

//     // the cipher function
//     const cipher = crypto.createCipheriv(algorithm, securitykey, initVector);

//     // encrypt the message
//     // input encoding
//     // output encoding
//     let encryptedData = cipher.update(token, "utf-8", "hex");

//     encryptedData += cipher.final("hex");
//     return encryptedData;

//     // console.log("Encrypted message: " + encryptedData);
// }

// module.exports = {
//     encryptToken
// }

