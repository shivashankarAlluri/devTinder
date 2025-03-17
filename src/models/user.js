const mongoose=require("mongoose");
const validator=require("validator")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userSchema= new mongoose.Schema(
    {
        firstName:{
            type: String,
            requird:true,
            minLength:3,
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
    }
    ,
    {
        timestamps:true
    }
)

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEVTINDER@780",{expiresIn:"1d"});
    return token;
}
userSchema.methods.validatePassword=async function(passwordgivenByUser){
    const user=this;
    const HashPassword=user.password;
    const validatePassword=await bcrypt.compare(passwordgivenByUser,HashPassword)
    return validatePassword;
}

module.exports=mongoose.model("User",userSchema)