const express = require('express')
const router = express.Router() 
const {pool} = require('../../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkToken = require('../../checkToken')
const checkMinRole = require('../../checkMinRole')


router.put('/',checkToken, checkMinRole(3), async (req,res) => {
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

        const insert = await pool.query('update reservation set room_id = $1, check_in_date= $2, check_in_time= $3, check_out_date= $4, check_out_time= $5, restaurant_charge= $6, room_service= $7, laundry= $8, club_facility= $9, telephone_service= $10, payment_method= $11, customer_identification= $12, customer_name= $13, customer_mobile= $14, travel_comapny_id= $15, status= $16, payed= $17, amount =$18 where reservation_id = $19',[body.roomId ,body.checkInDate ,body.checkInTime ,body.checkOutDate , body.checkOutTime , body.restaurantCharge, body.roomService,body.laundry,body.clubFacility,body.telephoneService,body.paymentMethod,body.customerIdentification,body.customerName,body.customerMobile,body.travelCompanyId? body.travelCompanyId: null,body.status, body.payed, req.body.amount, req.body.reservationId])

        return res.json({ 
            success: true,
            message: 'Reservation updated successfully',
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