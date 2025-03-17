const express=require("express");
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const mongoose=require("mongoose");
const User=require("../models/user.js")
const ConnectionRequest=require("../models/connectionRequest.js");

requestRouter.post("/send/:status/:userId",userAuth,async(req,res)=>{
    try{
        const status=req.params.status;
        const toUserId=new mongoose.Types.ObjectId(req.params.userId);
        const fromUser=req.user;
        const fromUserId=req.user._id;
        const isAllowedRequests= ["ignored","interested"].includes(status);
        const user=await User.findById({_id:toUserId });
        if(!user){
            return res.status(401).json({message:"User not exist"})
        }
        if(!isAllowedRequests){
            throw new Error("request status is not valid");
        }
        if((fromUserId.toString()===toUserId.toString())){
            return res.status(401).json({message:"cannot sent connection to same user"})
        }
        const AlreadyExists=await ConnectionRequest.findOne({
            $or:
            [
                {fromUserId:fromUserId,toUserId:toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ],
        })
        if(AlreadyExists){
            return res.status(401).json({message:"Request Already exists"})
        }
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        console.log(connectionRequest);
        const data=await connectionRequest.save();
        res.status(200).json({message:`${fromUser.firstName} is ${status} in  ${user.firstName}`,data})
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

module.exports=requestRouter;