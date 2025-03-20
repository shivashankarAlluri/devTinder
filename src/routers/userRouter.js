const express=require("express");
const ConnectionRequest=require("../models/connectionRequest.js");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js");
const User=require("../models/user.js")


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

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).populate("fromUserId",["firstName","lastName"]).populate("toUserId",["firstName","lastName"]);

        const connectionMembers=connectionRequest.map(row=>{
            if((row.fromUserId._id).toString()===(loggedInUser._id).toString()){
                return row.toUserId._id;
            }
            else{
                return row.fromUserId._id;
            }
        })
        console.log(connectionMembers);
        const dataOfallMembers=await User.find({});
        console.log(dataOfallMembers)
        const connectionIds = connectionMembers.map(id => id.toString());

        const feed = dataOfallMembers.filter(
            each => 
        !connectionIds.includes(each._id.toString()) && 
        each._id.toString() !== loggedInUser._id.toString());

        res.send({message:"fetched data of users to connect",data:feed})

    }catch(err){
        res.status(400).json({message:"something went wrong"})
    }
})

module.exports=userRouter;