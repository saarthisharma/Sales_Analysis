const mongoose = require("mongoose")
const Country = require("../Model/country")
const Region = require("../Model/region")
const ItemType = require("../Model/itemType")
const Order = require("../Model/order")

const csv = require('csv-parser')
const fs = require('fs');
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})

const connectDB = require("../config/dbConnection");
const { Console } = require("console");
connectDB();

let results = []
fs.createReadStream('../Assets/Sales_records.csv')
.pipe(csv())
.on('data', (data) => results.push(data))
.on('end', async() => {
    for (let index in results) {
        let countryId = await findOrInsertCountry(results[index]['Country'])
        let regionId = await findOrInsertRegion(results[index]['Region'])
        let itemTypeId = await findOrInsertItemType(results[index]['Item Type'])
        let orders = await findOrInsertOrder() 
    }
}
);

// function to insert countries 
async function findOrInsertCountry(country) {
    try {
        let data = await Country.updateOne(
            {name:country},
            {$set:{name:country}},
            {upsert:true, new: true}
        )
        let countryData = await Country.findOne({name : country})
        return countryData.id
    } catch (error) {
        console.log(error)
    }   
}

// function to insert region/continent
async function findOrInsertRegion(region) {
    try {
        let data = await Region.updateOne(
            {regionName:region},
            {$set:{regionName:region}},
            {upsert:true}
        )
        let regionData = await Region.findOne({regionName:region})
        return regionData.id
    } catch (error) {
        console.log(error)
    }
}

// function to insert item
async function findOrInsertItemType(item){
    try {
        let data = await ItemType.updateOne(
            {itemName:item},
            {$set:{itemName:item}},
            {upsert:true}
        )
        let itemData = await ItemType.findOne({itemName:item})
        return itemData.id
    } catch (error) {
        console.log(error)
    }
}

// function to insert orders

async function 