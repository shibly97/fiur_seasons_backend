const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.post('/',checkToken, checkMinRole(1), async (req,res) => {
    console.log("User tying to register|")
    console.log(req.body)

    try{

        const body = req.body

        const salt = 10
        const password = bcrypt.hashSync(req.body.password,salt)
        const insert = await pool.query('insert into staff (firstname, lastname, email, username, password, role_id, hotel_id) values ($1,$2,$3,$4,$5,$6,$7)',[body.firstname ,body.lastname ,body.email ,body.username , password , body.roleId, body.hotelId])

        return res.json({ 
            success: true,
            message: 'User Created successfully',
        })

     }
    catch(err){
        console.log(err)
        if(err.constraint === 'staff_username_key'){
            return res.json({ 
                success: false,
                message:"Username already in use."
        })
        }
        return res.json({ 
            success: false,
            error: 'Something went wrong'
        })
    }
})

module.exports = router