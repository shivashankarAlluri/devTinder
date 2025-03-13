const express=require("express");

const app=express();

app.get("/user",(req,res)=>{
    res.send({firstName:"shiva",lastname:"Alluri"});
})

app.post("/user",(req,res)=>{
    //logic written to database
    res.send("Data saved successfully to the database");
})
app.patch("/user",(req,res)=>{
    //logic written to database
    res.send("patch data saved successfully to the database");
})
app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully");
})
//this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
     res.send("Hello from the server");
})
app.use("/",(req,res)=>{
    res.send("HAHAHAHA")
})

app.listen(3000,()=>{
    console.log("server is running at port 3000");
})