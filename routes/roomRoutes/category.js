const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.get('/all', async (req,res) => {
    console.log("User tying get all room categories|")

    try{
        const get = await pool.query('select * from room_category')

        return res.json({ 
            success: true,
            roomCategories: get.rows
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
    console.log("User tying to room category|")
    console.log(req.body)

    try{

        const body = req.body

        const insert = await pool.query('insert into room_category (name, bed_count, description) values ($1,$2,$3)',[body.name ,body.bedCount ,body.description])

        return res.json({ 
            success: true,
            message: 'Room category Created successfully',
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
    console.log("User tying to update room cat|")
    console.log(req.body)

    try{

        const body = req.body

        const insert = await pool.query('update room_category set name=$1, bed_count=$2, description=$3 where room_category_id = $4',[body.name ,body.bedCount ,body.description ,body.roomCategoryId])

        return res.json({ 
            success: true,
            message: 'Room category updated successfully',
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

        const insert = await pool.query('delete from room_category where room_category_id = $1',[req.params.id])

        return res.json({ 
            success: true,
            message: 'Room category deleted successfully',
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