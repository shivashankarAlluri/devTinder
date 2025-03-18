const express=require("express");
const ConnectionRequest=require("../models/connectionRequest.js");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js")


userRouter.get("/user/received/requests",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])

        res.json({message:"Data fetched successfully",data:connectionRequests});
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);
        console.log(connections);
        const connectionsList=connections.map(row=>{
            if((row.fromUserId._id).toString()===(loggedInUser._id).toString()){
                return row.toUserId
            }
            else{
                return row.fromUserId
            }
        });
        console.log(loggedInUser._id)
        console.log(connectionsList)
        res.json({message:"Fetched connection details",data:connectionsList})
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})



module.exports=userRouter;