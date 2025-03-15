const mongoose=require("mongoose");
const validator=require("validator")

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
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email format is not correct");
                }
            }
        },
        password:{
            type:String,
            required:true,
            minLength:9,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Password is not strong");s
                }
            }
        },
        age:{
            type:Number,
            min:18
        },
        photoUrl:{
            type:String,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("URL format is not correct");
                }
            }
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