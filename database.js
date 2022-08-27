const {Pool} = require('pg')
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.DB_USER, process.env.DB_PASSWORD)

const pool = new Pool({
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    max: 10,                                                                
    idleTimeoutMillis: 20, 
    ssl: { rejectUnauthorized: false }
    // ssl: process.env.ENV == "DEVELOPMENT" ? false : true
    // dialectOptions: {
    //     ssl: {
    //       require: true, // This will help you. But you will see nwe error
    //       rejectUnauthorized: false // This line will fix new error
    //     }
    //   },
})

module.exports.pool = pool;