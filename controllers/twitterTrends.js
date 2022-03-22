const Twitter = require("twitter")
const dotenv = require("dotenv");
const res = require("express/lib/response");
dotenv.config({path : "../.env"})

const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")

exports.getTrends=async(req,res)=>{
    try {
        let hashtag = []
        let trendingValue = req.query.trendingValue
        console.log('trendingValue :', trendingValue);

        let client = new Twitter({
            consumer_key:process.env.TWITTER_CONSUMER_KEY,
            consumer_key_secret:process.env.TWITTER_CONSUMER_KEY_SECRET,
            bearer_token:process.env.TWITTER_BEARER_TOKEN
        })  
        let params = {
            id:'23424848'
        };
        client.get('trends/place', params, gotData)
        function gotData(err,data,response){
            if(err){
                return responseHandler.handler(res,false, message.customMessages.error, [], 500)
            }
            else{
                data[0].trends.forEach( (element,value) =>{
                    if(value<trendingValue){
                        hashtag.push(element.name)
                    }
                })
                return responseHandler.handler(res,true, message.fetchedHashtag,hashtag, 201)
            }
        }      
    } catch (error) {
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}
