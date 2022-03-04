const express = require("express");
const app = express();
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

// parse requests of content-type - application/json
app.use(express.json());

// requiring routes
app.use(""  ,require("./routes/userRoutes"))

// requiring admin routes
app.use("" ,require("./routes/adminRoutes"))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.end(err + "\n");
});

app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})
