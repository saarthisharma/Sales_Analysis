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
