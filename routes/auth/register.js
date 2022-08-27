const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
// const sendNoReplyEmail = require('../../services/emails/sendNoReplyEmail')
// const {OAuth2Client} = require('google-auth-library')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const fetch = require('node-fetch');

router.post('/', async (req,res) => {
    console.log("User tying to register|")
    console.log(req.body)

    try{

        const body = req.body

        const salt = 10
        const password = bcrypt.hashSync(req.body.password,salt)
        // 
        // const checkUser = await pool.query('select username, staff_id, role_id from staff where username=$1',[req.body.username])
        const insert = await pool.query('insert into staff (firstname, lastname, email, username, password, role_id) values ($1,$2,$3,$4,$5,$6)',[body.firstname ,body.lastname ,body.email ,body.username , password ,body.roleId])

    
       
        // if a account exist to the username
        // if(checkUser.rows[0]){ 
 
        //         const password = bcrypt.compareSync(req.body.password,checkUser.rows[0].password)

        //         if(password){
        //             console.log("Correct password")

        //             const accessToken = jwt.sign({ staffId:checkUser.rows[0].staff_id, roleId:req.body.role_id},process.env.JWT_ACCESSTOKEN_SECRET,{expiresIn: 60*60*24*7})

        //             return res.json({ 
        //                 success: true,
        //                 message: 'User Authorized',
        //                 accessToken : accessToken,
        //                 staffId: checkUser.rows[0].staff_id,
        //                 roleId: req.body.role_id
        //             })
        //         }else{
        //             console.log("Incorrect password")
        //             return res.json({ 
        //                 success: false,
        //                 message: 'Email or password is incorrect.'
        //             })
        //         }
          

        // // if no users found
        // }else{
        //     console.log("No users found to the email")
        //       return res.json({ 
        //           success: false,
        //           message: 'Email or password is incorrect.'
        //       })
        //   }
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