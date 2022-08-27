const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.get('/all', async (req,res) => {
    console.log("User tying get all hotels|")

    try{
        const get = await pool.query('select * from hotel')

        return res.json({ 
            success: true,
            hotels: get.rows
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

router.post('/add',checkToken, checkMinRole(1), async (req,res) => {
    console.log("User tying to add hotel|")
    console.log(req.body)

    try{

        const body = req.body

        const insert = await pool.query('insert into hotel (name, email, address, mobile) values ($1,$2,$3,$4)',[body.name ,body.email ,body.address ,body.mobile])

        return res.json({ 
            success: true,
            message: 'Hotel Created successfully',
        })

     }
    catch(err){
        return res.json({ 
            success: false,
            error: 'Something went wrong'
        })
    }
})

router.put('/update',checkToken, checkMinRole(1), async (req,res) => {
    console.log("User tying to update hotel|")
    console.log(req.body)

    try{

        const body = req.body

        const insert = await pool.query('update hotel set name=$1, email=$2, address=$3, mobile=$4 where hotel_id = $5',[body.name ,body.email ,body.address ,body.mobile, body.hotelId])

        return res.json({ 
            success: true,
            message: 'Hotel details updated successfully',
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

router.delete('/delete/:id',checkToken, checkMinRole(1), async (req,res) => {
    console.log("User tying to delete hotel|")

    try{

        const insert = await pool.query('delete from hotel where hotel_id = $1',[req.params.id])

        return res.json({ 
            success: true,
            message: 'Hotel deleted successfully',
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