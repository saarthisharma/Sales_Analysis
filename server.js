const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const res = require("express/lib/response");
const req = require("express/lib/request");
const dotenv = require("dotenv")
const path = require("path");
dotenv.config({path : ".env"})
global.__basedir = __dirname;

const PORT = process.env.PORT || 8080

// requiring database
const connectDB = require("./config/dbConnection");
connectDB();

const {socketTokenAuthentication} = require("./middleware/socketMiddleware")

// parse requests of content-type - application/json
app.use(express.json());

// requiring agent routes
app.use(""  ,require("./routes/userRoutes"))

// requiring admin routes
app.use("" ,require("./routes/adminRoutes"))

// requiring customer routes
app.use("",require("./routes/customerRoutes"))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(err + "\n");
});

app.use(express.static(__basedir));

app.get("/" , (req,res)=>{
    let filepath = path.join(__basedir, "views", "templates", "index.html");
    res.sendFile(filepath)
})

const server = app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})

// io is a Socket.IO server instance attached to an instance of http.Server listening for incoming events.
// The socket argument of the connection event listener callback function 
// is an object that represents an incoming socket connection from a client.
const io = require("socket.io")(server)

let array = []

io.on('connection',(socket)=>{
    console.log("websocket connected...")
        let socketId = socket.id

        array.push(socketId)

        if(array.length <= 2){
            socket.on('userAuthentication',async(authPayload)=>{
                let authStatus = await socketTokenAuthentication(authPayload.token)

                if(authStatus == true){

                    console.log('authStatus :', authStatus);
        
                    socket.join("room1");
        
                    socket.on('emittingMessage',(userNameAndMessage)=>{
        
                    console.log("userNameAndMessage" , userNameAndMessage)
        
                    socket.broadcast.to("room1").emit('emittingMessage',userNameAndMessage)
                    })
                }
                else{
                    console.log('authStatus :', authStatus);
    
                    socket.disconnect()
                }           
        })
        }
        else{
            socket.disconnect()
            console.log("room space is only for 2 ")
        }

})