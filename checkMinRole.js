const checkMinRole = (minRole) => {
    return (req, res, next) => {
        const hasPermission = (+req.user?.roleId <= minRole)? true : false
        if(hasPermission){
            console.log("user has permission")
            next();
        }else{
            console.log("user has no permission")
            return res.json({
                success:false,
                authorization:false,
                message:"User dont have permission to this service"
            })
        }
    }
}

module.exports = checkMinRole