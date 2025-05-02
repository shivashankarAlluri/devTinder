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
        const page=parseInt(req.query.page) ||1;
        let limit=parseInt(req.query.limit) ||10;
        limit=limit >50 ? 50:limit;
        const skip=(page-1)*10;
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).populate("fromUserId",["firstName", "lastName"]).populate("toUserId",["firstName", "lastName"]);
        console.log(connectionRequest);
        const hidedataofusers=new Set();
        connectionRequest.forEach((req)=>{
            hidedataofusers.add(req.fromUserId._id.toString())
            hidedataofusers.add(req.toUserId._id.toString());
        })
        const feed=await User.find({
            $and:[
                {_id:{$nin:Array.from(hidedataofusers)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select("firstName lastName").skip(skip).limit(limit);
        console.log(feed);
        res.send({message:"fetched data of users to connect",data:feed})

    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports=userRouter;