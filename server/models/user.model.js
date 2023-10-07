import mongoose from "mongoose";
const Schema=mongoose.Schema;
const Userschema=new Schema({
  Name:{
    type:String,
    trim:true,
    required:"Name is required"
  },
  Email:{
    type:String,
    trim:true,
    required:[/.+@.+\..+/,"please fill valid emailid"],
    unquie:true
  },
  Password:{
    type:String,
    required:"Password is required",
  },
  created:{
    type:Date,
    default:Date.now
  },
  updated:Date,
  ID:[{
    type: Schema.Types.ObjectId,
    ref:"Blog"
  }]
});
export default mongoose.model('User',Userschema);