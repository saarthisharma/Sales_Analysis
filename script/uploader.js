// requiring models
// const Country = require("../Model/country")
// const ItemType = require("../Model/itemType")
// const Order = require("../Model/order")
// const Region = require("../Model/region")

const express = require("express")
const app = express();

const csv = require('csv-parser')
const fs = require('fs');
const req = require("express/lib/request");
const res = require("express/lib/response");


// app.post("/upload",async(req,res)=>{
//   const results = [];
//   fs.createReadStream('../Assets/Sales_records.csv')
//     .pipe(csv())
//     .on('data', (data) => results.push(data))
//     .on('end', () => {
//       console.log(results);
//     }); 
// })
