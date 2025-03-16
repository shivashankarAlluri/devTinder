const express=require("express");
const {validationSignUpData}=require("../utils/validation.js");
const bcrypt=require("bcrypt");
const User=require("../models/user.js");
const validator=require("validator");


const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{

    try{
        //validation of new Data
        validationSignUpData(req);
        const {firstName,lastName,password,emailId}=req.body;
        const HashPassword=await bcrypt.hash(password,10);

        const user=new User({
            firstName:firstName,
            lastName:lastName,
            emailId:emailId,
            password:HashPassword
        })
        await user.save()
        res.send("User Data added Successfully");
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message)
    }
})

authRouter.post("/login",async(req,res)=>{
    const {emailId,password}=req.body;
    try{
        if(!validator.isEmail(emailId)){
            throw new Error("Not an valid Email Id")
        }
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const hashpassword=await user.validatePassword(password)
        console.log(hashpassword);
        if(hashpassword){
            const token=await user.getJWT();
            res.cookie("token",token,{ expires: new Date(Date.now() + 900000), httpOnly: true });
            res.send("login successfully");
        }
        else{
            throw new Error("Invalid Crendentials")
        }
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message)
    }
})
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("logout successfull")
})

module.exports=authRouter;