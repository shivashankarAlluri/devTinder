const express=require("express");
const {userAuth}=require("../middlewares/auth.js");
const profileRouter=express.Router();
const{validateEditDetails}=require("../utils/validation.js");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
    
});
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        validateEditDetails(req);
        const user=req.user;
        Object.keys(req.body).forEach(key=>user[key]=req.body[key]);
        await user.save();
        console.log(user);
        res.json({message:`${user.firstName} is successfully updated`,data:user})
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

module.exports=profileRouter;