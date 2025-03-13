const express=require("express");

const {adminAuth,userAuth} =require("./middlewares/auth.js");
const app=express();

app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data send")
})
app.post("/admin/deleteData",(req,res)=>{
    res.send("deleted data");
})
app.get("/user/getAllData",userAuth,(req,res)=>{
    res.send("all user data send")
})
app.get("/user/login",(req,res)=>{
    res.send("user data send")
})
app.delete("/user",userAuth,(req,res)=>{
    throw new Error("bcbbhcbjbd")
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went error");
    }
})
app.listen(3000,()=>{
    console.log("server is running at port 3000");
})