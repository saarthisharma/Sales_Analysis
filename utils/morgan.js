// Morgan logs responses and requests from an HTTP server.
// Its log entries are based on the HTTP request and error loglines.


const express = require("express")
const morgan = require("morgan")
const app = express()
const logger = require("../utils/logger")
const dotenv = require("dotenv")
const path = require("path");
dotenv.config({path : "../.env"})

const PORT = process.env.PORT || 8080

app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(PORT, () =>{
    logger.info(`server is running at http://localhost:${PORT}`)
})
