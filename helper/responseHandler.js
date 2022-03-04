module.exports.handler=(res,error,message,token,status)=>{
    if(!error){
        return res.status(status).json({
            message,
            status:false,
            code: status,
            token : token
        })
    }
    else
    {
        return res.status(status).json({
            message,
            status: error,
            code: status,
            token : token
        })
    }  
}


module.exports.profileHandler=(res,error,message,updatedData,status)=>{
    if(!error){
        return res.status(status).json({
            message,
            status:false,
            code: status,
            updatedData: updatedData
        })
    }
    else
    {
        return res.status(status).json({
            message,
            status: error,
            code: status,
            updatedData: updatedData
        })
    }  
}



module.exports.messageHandler=(res,error,message,data,status)=>{
    if(!error){
        return res.status(status).json({
            message,
            status:false,
            code: status,
            data: data
        })
    }
    else
    {
        return res.status(status).json({
            message,
            status: error,
            code: status,
            data: data
        })
    }  
}