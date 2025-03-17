const express=require("express");
const {userAuth}=require("../middlewares/auth.js");
const profileRouter=express.Router();
const User=require("../models/user.js");
const{validateEditDetails}=require("../utils/validation.js");
const bcrypt=require("bcrypt");

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
profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        const {emailId,oldPassword,newPassword}=req.body;
        const loggedInuser=req.user;
        if(!(loggedInuser.emailId===emailId)){
            throw new Error("Invalid Credentials");
        }
        const isvalidateUser=await bcrypt.compare(oldPassword,loggedInuser.password);
        if(!isvalidateUser){
            throw new Error("Invalid Credentials");
        }
        const newHashPassword=await bcrypt.hash(newPassword,10);
        console.log(loggedInuser)
        loggedInuser.password=newHashPassword;
        console.log(loggedInuser)
        await loggedInuser.save();
        res.send(`${loggedInuser.firstName} password is updated successfully`);
        

    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
    
})


module.exports = profileRouter;