const express=require("express");
const bcrypt=require("bcrypt");
const connectDB=require("./config/database.js");
const User=require("./models/user.js");
const validator=require("validator")
const {validationSignUpData}=require("./utils/validation.js");
const app=express();


app.use(express.json()) //Middleware converts JSON data to Js object

app.post("/signup",async(req,res)=>{

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

app.post("/login",async(req,res)=>{
    const {emailId,password}=req.body;
    try{
        if(!validator.isEmail(emailId)){
            throw new Error("Not an valid Email Id")
        }
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const hashpassword=await bcrypt.compare(password,user.password);
        if(hashpassword){
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
