const adminAuth=(req,res,next)=>{
    console.log("authorization is checking...")
    const token="xyz";
    const isauthorized=(token==="xyz");
    if(isauthorized){
        next();
    }
    else{
        res.status(401).send("unauthorized token")
    }
}

const userAuth=(req,res,next)=>{
    console.log("authorization is checking...")
    const token="xyz";
    const isauthorized=(token==="xyz");
    if(isauthorized){
        next();
    }
    else{
        res.status(401).send("unauthorized token")
    }
}

module.exports={adminAuth,userAuth};