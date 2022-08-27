const express = require('express')
const {pool} = require('./database')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req,res) => res.send("Four Seasons Server Up"))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/hotel', require('./routes/hotelRoutes'))
app.use('/api/room', require('./routes/roomRoutes'))
app.use('/api/reservation', require('./routes/roomRoutes'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log("four_seasons server is running in port " + PORT)
})