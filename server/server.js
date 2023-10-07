import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017",{
  dbName:"cmsuser"
}).then(()=>{console.log("database connected")}).catch((e)=>{console.log(e)})
export default mongoose