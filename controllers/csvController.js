const res = require("express/lib/response");
const mongoose = require("mongoose");

test = async(req,res)=>{
    res.send("testing")
}
module.exports = {
    test
}