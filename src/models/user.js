const mongoose=require("mongoose");

const userSchema= new mongoose.Schema(
    {
        firstName:{
            type: String,
            requird:true,
            minLength:4,
            maxLength:30
        },
        lastName:{
            type:String,
            required:true,
            minLength:3,
            maxLength:30
        },
        emailId:{
            type:String,
            unique:true,
            lowercase:true,
            trim:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minLength:9,
            maxLength:20
        },
        age:{
            type:Number,
            min:18
        },
        photoUrl:{
            type:String,
            default:"https://www.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292033.jpg"
        },
        about:{
            type:String,
            default:"Please add something",
        },
        gender:{
            type:String,
            lowercase:true,
            validate(value){
                if(![male,female,others].includes(value)){
                    throw new Error("Gender is not valid");
                }
            }
        },
        skills:{
            type:[String]
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("User",userSchema)