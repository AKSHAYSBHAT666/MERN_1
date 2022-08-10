const jwt=require("jsonwebtoken");

//performing authorization
const auth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        let decodedData;

        if(token )
        {
            decodedData=await jwt.verify(token,"test");
            req.userId = decodedData?.id;
            console.log(req.userId);
        }

        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports=auth;