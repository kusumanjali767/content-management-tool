import mongoose from "mongoose";
mongoose.connect("mongodb+srv://bhavish:bhavish767@cluster1.7darboo.mongodb.net/?retryWrites=true",{
  dbName:"cmsuser"
}).then((c)=>{console.log(`database connected with ${c.connection.host}`)}).catch((e)=>{console.log(e)})
//mongodb://127.0.0.1:27017
export default mongoose