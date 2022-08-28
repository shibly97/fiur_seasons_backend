const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.get('/all',checkToken, checkMinRole(3), async (req,res) => {
    console.log("User tying get all reservations|")

    try{
        const get = await pool.query('select * from reservation')

        return res.json({ 
            success: true,
            reservations: get.rows
        })

     }
    catch(err){
        console.log(err)
        return res.json({ 
            success: false,
            error: 'Something went wrong'
        })
    }
})

router.get('/getByStatus/:status',checkToken, checkMinRole(3), async (req,res) => {
    console.log("User tying get reservations by status|", req.params.status)

    try{
        const get = await pool.query('select * from reservation where status =$1',[req.params.status])

        return res.json({ 
            success: true,
            reservations: get.rows
        })

     }
    catch(err){
        console.log(err)
        return res.json({ 
            success: false,
            error: 'Something went wrong'
        })
    }
})

router.get('/getById/:id',checkToken, checkMinRole(3), async (req,res) => {
    console.log("User tying get reservation by id|", req.params.status)

    try{
        const get = await pool.query('select * from reservation where reservation_id =$1',[req.params.id])

        return res.json({ 
            success: true,
            reservation: get.rows[0]
        })

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