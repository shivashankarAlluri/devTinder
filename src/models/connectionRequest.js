const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema(
    {

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not a valid type`
        }
    }
    },
    {
        timestamps:true

    }
)

connectionRequestSchema.index({fromUserId:1});

module.exports=mongoose.model("ConnectionRequest",connectionRequestSchema);