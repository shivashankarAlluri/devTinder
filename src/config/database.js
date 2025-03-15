const mongoose=require("mongoose");

const connectDB=async()=>{
   await mongoose.connect("mongodb+srv://shivashankar:JtQDlFFCnBKW3Yka@namastenode.u6kr9.mongodb.net/devtinder");
}

module.exports=connectDB;
