const {createLogger,transports,format} = require("winston")
const logger = createLogger({
    transports:[
        new transports.File({
            filename: '../logs/info.log',
            level: 'error',
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
});

// logger.info("a testing message")

module.exports = logger    



// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };