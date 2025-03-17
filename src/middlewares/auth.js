const jwt=require("jsonwebtoken");
const User=require("../models/user")

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is invalid");
        }
        const decoded=await jwt.verify(token,"DEVTINDER@780")
        const user=await User.findOne({_id:decoded._id})
        if(!user){
            throw new Error("User not Found");
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
    
}

module.exports={userAuth};