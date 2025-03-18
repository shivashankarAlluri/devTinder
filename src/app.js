const express=require("express");
const connectDB=require("./config/database.js");
const cookieParser=require("cookie-parser");
const app=express();


app.use(express.json()) //Middleware converts JSON data to Js object
app.use(cookieParser())

const profileRouter=require("./routers/profileRouter.js");
const authRouter=require("./routers/authRouter.js");
const requestRouter=require("./routers/requestRouter.js");
const userRouter=require("./routers/userRouter");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


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
