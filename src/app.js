const express=require("express");

const app=express();

app.use("/user",(req,res,next)=>{
    console.log("1st response in console");
    //res.send("1st response")
    next();
},
(req,res,next)=>{
    console.log("2nd response in console");
    //res.send("2nd response")
    next();
},
(req,res,next)=>{
    console.log("3rd response in console");
    //res.send("3rd response")
    next();
},
(req,res,next)=>{
    console.log("4th response in console");
    //res.send("4th response")
    next();
},
(req,res,next)=>{
    console.log("5th response in console");
    res.send("5th response")
    next();
},

)

app.listen(3000,()=>{
    console.log("server is running at port 3000");
})