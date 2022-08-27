const {Pool} = require('pg')
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.DB_USER, process.env.DB_PASSWORD)

const development = process.env.ENV == "DEVELOPMENT" ? true : false

const config = {
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    max: 10,                                                                
    idleTimeoutMillis: 20, 
    // (process.env.ENV == "DEVELOPMENT" ? )
    // development && {ssl: { rejectUnauthorized: false }}
    // ssl: process.env.ENV == "DEVELOPMENT" ? false : true
    // dialectOptions: {
    //     ssl: {
    //       require: true, // This will help you. But you will see nwe error
    //       rejectUnauthorized: false // This line will fix new error
    //     }
    //   },
}

if(!development){
    config.ssl = { rejectUnauthorized: false }
}

const pool = new Pool(config)

module.exports.pool = pool;