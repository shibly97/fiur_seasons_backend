const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.get('/all/:hotelId', async (req,res) => {
    console.log("User tying get all room for hotel|")

    try{
        const get = await pool.query('select r.room_id, rc.name as category_name from room r join room_category rc ON r.room_category_id = rc.room_category_id WHERE r.hotel_id = $1',[req.params.hotelId])

        return res.json({ 
            success: true,
            rooms: get.rows
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

router.get('/allAvailable/:hotelId', async (req,res) => {
    
    const roomCategory = req.query.roomCategory;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    
    console.log("User tying get all available room for hotel|", roomCategory, fromDate, toDate)
    try{
        const getAllRooms = await pool.query('select r.room_id, rc.name from room r join room_category rc ON r.room_category_id = rc.room_category_id WHERE r.hotel_id = $1 AND r.room_category_id = $2',[req.params.hotelId, roomCategory])

        
        const recervedRooms = await pool.query('SELECT re.room_id from reservation re join room r ON r.room_id=re.room_id WHERE re.check_in_date >= $1 AND re.check_out_date <= $2 AND re.status != $3 AND r.hotel_id = $4 AND r.room_category_id= $5',[fromDate, toDate, 'canceled', req.params.hotelId, roomCategory])
        
        let recervedRoomsArr = recervedRooms.rows.map(room => +room.room_id)
        let availableRooms = []
        
        getAllRooms.rows.map(room => {
            if(recervedRoomsArr.indexOf(+room?.room_id) > -1){
                return
            }else{
                availableRooms.push(room)
            }
        })

        return res.json({ 
            success: true,
            availableRooms
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
    console.log("User tying to add room|")
    console.log(req.body)

    try{

        const body = req.body

        const insert = await pool.query('insert into room (hotel_id, room_category_id) values ($1,$2)',[body.hotelId ,body.roomCategoryId])

        return res.json({ 
            success: true,
            message: 'Room Created successfully',
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
    console.log("User tying to update room|")
    console.log(req.body)

    try{

        const body = req.body

        const insert = await pool.query('update room set hotel_id=$1, room_category_id=$2 where room_id = $3',[body.hotelId ,body.roomCategoryId ,body.roomId])

        return res.json({ 
            success: true,
            message: 'Room updated successfully',
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
    console.log("User tying to delete room|")

    try{

        const insert = await pool.query('delete from room where room_id = $1',[req.params.id])

        return res.json({ 
            success: true,
            message: 'Room deleted successfully',
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