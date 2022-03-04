const Joi = require("joi");

const addOrderValidation = (body) => {
    const Schema = Joi.object({
        orderPriority:Joi.string(),
        orderDate:Joi.date(),
        orderId:Joi.number(),
        shipDate:Joi.date(),
        unitSold:Joi.number(),
        unitsPrice:Joi.number(),
        unitCost:Joi.number(),
        totalRevenue:Joi.number(),
        totalCost:Joi.number(),
        totalProfit:Joi.number(),
        countryId:Joi.string(),
        itemId:Joi.string(),
        regionId:Joi.string(),
        addedViaApi:Joi.number(),
        isDeleted:Joi.number()
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

exports.addOrderValidation = addOrderValidation;