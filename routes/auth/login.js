const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
// const sendNoReplyEmail = require('../../services/emails/sendNoReplyEmail')
// const {OAuth2Client} = require('google-auth-library')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
// const fetch = require('node-fetch');

router.post('/', async (req,res) => {
    console.log("User tying to login |")
    console.log(req.body)
    if(!req.body.password || !req.body.username){
        return res.json({ 
            success: false,
            message: 'No data on body'
        })
    }

    try{
        // 
        const checkUser = await pool.query('select username, staff_id, role_id, hotel_id, password from staff where username=$1',[req.body.username])
       
        // if a account exist to the username
        if(checkUser.rows[0]){ 
 
                const password = bcrypt.compareSync(req.body.password,checkUser.rows[0].password)

                if(password){
                    console.log("Correct password")

                    const accessToken = jwt.sign({ staffId:checkUser.rows[0].staff_id, roleId: checkUser.rows[0].role_id},process.env.JWT_ACCESSTOKEN_SECRET,{expiresIn: 60*60*24*7})

                    return res.json({ 
                        success: true,
                        message: 'User Authorized',
                        accessToken : accessToken,
                        staffId: checkUser.rows[0].staff_id,
                        roleId: checkUser.rows[0].role_id,
                        hotelId: checkUser.rows[0].hotel_id,
                    })
                }else{
                    console.log("Incorrect password")
                    return res.json({ 
                        success: false,
                        message: 'Email or password is incorrect.'
                    })
                }
          

        // if no users found
        }else{
            console.log("No users found to the email")
              return res.json({ 
                  success: false,
                  message: 'Email or password is incorrect.'
              })
          }
     }
    catch(err){
        console.log(err)
        return res.json({ 
            success: false,
            error: 'Something went wrong'
        })
    }
})

module.exports = router