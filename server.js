const express = require('express')
const {pool} = require('./database')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.SERVER_PORT || 8080

app.listen(PORT, () =>{
    console.log("four_seasons server is running in port " + PORT)
})