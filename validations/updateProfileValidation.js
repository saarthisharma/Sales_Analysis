const Joi = require("joi");

const ProfileValidation = (body) => {
    const Schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        pinCode: Joi.number().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.string().required()
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

exports.ProfileValidation = ProfileValidation;