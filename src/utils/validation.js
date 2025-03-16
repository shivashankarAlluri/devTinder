const validator=require("validator");

const validationSignUpData=(req)=>{
    const{firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
            throw new Error("Password is not strong")
    }

}

const validateEditDetails=(req)=>{
    const AllowedEditDetails=["age","firstName","lastName","about","skills","photoUrl","gender"];
        const isValidated=Object.keys(req.body).every(field=>AllowedEditDetails.includes(field));
        if(!isValidated){
            throw new Error("choose correct fields to update");
        }

}
module.exports={validationSignUpData,validateEditDetails}