const express=require("express");
const connectDB=require("./config/database.js");
const User=require("./models/user.js");
const app=express();
app.use(express.json()) //Middleware converts JSON data to Js object

app.patch("/user/:userId",async(req,res)=>{
    const userid=req.params?.userId;
    const data=req.body;
    try{
        const AllowedData=["gender","age","photoUrl","about"];
        const isUpdateAllowed=Object.keys(data).every((k)=>AllowedData.includes(k));
        if(!isUpdateAllowed){
            throw new Error("update not Allowed")
        }
        await User.findByIdAndUpdate(userid,data,{runValidators:true});
        res.send("user updated Successfully");
    }
    catch(err){
        res.status(400).send("something went wrong"+err.message);
    }
})

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        await User.findByIdAndDelete({_id:userId});
        res.send("User Deleted Successfully");
    }
    catch(err){
        res.status(400).send("something went wrong "+err.message)
    }
})

app.get("/user",async(req,res)=>{
    const firstName=req.body.firstName;
    try{
        const users=await User.findOne({firstName:firstName});
        console.log(users);
        if(users.length===0){
            res.status(401).status("user specified by Id is not there")
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("something went wrong"+err.message);
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const emailId=req.body.emailId;
        const users=await User.find({emailId:emailId})
        if(users.length===0){
            res.status(401).send("users are not there");
        }
        else{
            res.send(users)
        }
    }
    catch(err){
        res.status(400).send("something went wrong "+err.message);
    }
})

app.post("/signup",async(req,res)=>{
    const user=new User(req.body)
    try{
        if(user.skills?.length>10){
            throw new Error("skills length not more than 10");
        }
        await user.save()
        res.send("User Data added Successfully");
    }
    catch(err){
        res.status(400).send("something went wrong"+err.message)
    }
})

connectDB()
.then(()=>{
    console.log("successfully connected to database");
    app.listen(3000,()=>{
        console.log("server is running at port 3000");
    })
})
.catch((err)=>{
    console.error("Database connection is not connected")
})
