const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.post('/', async (req,res) => {
    console.log("User tying to create a reservation|")
    console.log(req.body)

    try{

        const body = req.body

        if(body.travelCompanyId && !body.travelCompanyCode){
            return res.json({ 
                success: false,
                message:"Travel company code missing"
            })
        }else if(body.travelCompanyId && body.travelCompanyCode){
            const travelCom = await pool.query('SELECT travel_company_id, code from travel_company where travel_company_id = $1',[body.travelCompanyId] )

            if(travelCom.rows[0].code != body.travelCompanyCode){
                return res.json({ 
                    success: false,
                    message:"Travel company code is incorrect"
                })
            }
        }

        const insert = await pool.query('insert into reservation (room_id, check_in_date, check_in_time, check_out_date, check_out_time, restaurant_charge, room_service, laundry, club_facility, telephone_service, payment_method, customer_identification, customer_name, customer_mobile, travel_comapny_id, status, payed) values ($1,$2,$3,$4,$5,$6,$7, $8,$9,$10,$11,$12,$13,$14,$15,$16, $17)',[body.roomId ,body.checkInDate ,body.checkInTime ,body.checkOutDate , body.checkOutTime , body.restaurantCharge, body.roomService,body.laundry,body.clubFacility,body.telephoneService,body.paymentMethod,body.customerIdentification,body.customerName,body.customerMobile,body.travelCompanyId? body.travelCompanyId: null,'pending', body.payed])

        return res.json({ 
            success: true,
            message: 'Reservation Created successfully',
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