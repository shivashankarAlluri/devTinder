const express=require("express");
const connectDB=require("./config/database.js");
const cookieParser=require("cookie-parser");
const profileRouter=require("./routers/profileRouter.js");
const authRouter=require("./routers/authRouter.js");
const app=express();


app.use(express.json()) //Middleware converts JSON data to Js object
app.use(cookieParser())

app.use("/",authRouter);
app.use("/",profileRouter);


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
