const jwt = require('jsonwebtoken')

const checkToken = async (req,res,next) => {
    console.log(req.headers.authorization)
    if(req.headers.authorization){

        accessToken = req.headers.authorization
        // console.log(accessToken)

        jwt.verify(accessToken,process.env.JWT_ACCESSTOKEN_SECRET,(err,ADesirealized) => {
            if(err){
                console.log('Accesstoken expired')
                return res.json({
                    success:false,
                    authorization:false,
                    message:"Accesstoken expired"
                })
            }
            console.log('Valid token')
            req.user = ADesirealized
            return next() 
        })

    }else{
        console.log("Accesstoken is missing")
        return res.json({
            success:false,
            authorization: false,
            message:"Authentication Error"
        })
    }
}

module.exports = checkToken