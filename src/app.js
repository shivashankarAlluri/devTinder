const express=require("express");

const app=express();

app.get((req,res)=>{
    res.send("Happy Birthday");
})

app.get("/hello",(req,res)=>{
    res.send("hello Happy Birthday");
})

app.listen(3000,()=>{
    console.log("server is running at port 3000");
})