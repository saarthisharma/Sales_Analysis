const crypto = require('crypto');
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
let encryptToken = (token) =>{
    // Defining key
        const secret = process.env.CRYPTO_SECRET;

        // Calling createHash method
        const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

        return hash;
}

module.exports = {
    encryptToken
}
