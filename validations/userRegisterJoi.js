const Joi = require("joi");

const userValidation = (body) => {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(new RegExp("[a-zA-Z0-9]{8,15}")).required(),
        confirmPassword:Joi.ref("password"),
    });

    let error = false;
    let message = '';
    let validate = Schema.validate(body);
    
    if(validate.error){
        message= validate.error.details[0].message;
        message = message.replace(/"/g, '')
        message = message[0].toUpperCase() + message.slice(1);
        error = true;
    }
    
    return {error: error, message: message};
};

exports.userValidation = userValidation;