import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const signin =async(req,res)=>{
  try {
  const {Email,Password}=req.body;
  const user=await User.findOne({Email});
  if(!user) return res.status(400).json({
    success:false,
    Message:'Invalid email or password'
  });
  const isequal=await bcrypt.compare(Password,user.Password);
  if(!isequal) return res.status(400).json({
    success:false,
    Message:'Invalid email or password'
  })
  const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
  res.cookie("t",token,({
    httponly:true,
    expire:Date.now()+9999
  })).status(200).json({
    success:true,
    Message:'signin successfully'
  })
}catch(e){
  console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
}
}
const register=async(req,res)=>{
  try {
 const {Name,Email,Password}=req.body;
 let user=await User.findOne({Email})
 if(user) return res.status(400).json({
    success:false,
    Message:"User Already exists"
 })
 if(!Password) return res.json({
    success:false,
    Message:'fill all required fields'
 })
 const hashedpassword=await bcrypt.hash(Password,8);
 user=await User.create({Name,Email,Password:hashedpassword})
 const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
 res.cookie('t',token,({
    httponly:true,
    expire:Date.now()+9999
 })).status(200).json({
    success:true,
    Message:'Successfully Registered'
 })
}
catch(e){
  console.error(e);
    return res.status(500).json({
      success: false,
      Message: 'Internal Server Error'
    });
}
}
const signout=async(req,res)=>{
  try {
   res.cookie('t','',({
    expires:new Date(Date.now())
   })).status(400).json({
    success:true,
    Message:'signedout successfully'
   })
  }
  catch(e){
    console.error(e);
      return res.status(500).json({
        success: false,
        Message: 'Internal Server Error'
      });
  }
}

export default {signin,register,signout}