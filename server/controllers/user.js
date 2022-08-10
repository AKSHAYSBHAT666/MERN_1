const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const User=require("../models/user")

const signin=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const existingUser=await User.findOne({email});
        if(!existingUser)
        {
            return res.status(404).json({message:"User Does'nt Exist"});
        }

        const isPasswordCorrect=await bcrypt.compare(
            password,existingUser.password
        )

        if(!isPasswordCorrect)
        {
            return res.status(404).json({message:"Password Wrong"});
        }
        //give all info to store in the token for authentication
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"23h"})
        return res.status(200).json({result:existingUser,token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something Went Wrong"});
    }
}

const signup=async(req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(404).json({message:"UserExist,so signin"});
        }
        

        const hashedPassword=await bcrypt.hash(password,10);
        const result=await User.create({
            email,
            password:hashedPassword,
            name:`${firstName} ${lastName}`
        })
        const token=jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"23h"})
        //locha in result
        return res.status(200).json({result,token});
    }
    catch(err){
        console.log(err);
        res.status(506).json({message:err});
    }
}

module.exports={signin,signup};