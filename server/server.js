import mongoose from "mongoose";
import {config} from "dotenv";
config({
  path: "./data/config.env",
});
mongoose.connect(process.env.MONGO_URI,{
  dbName:"cmsuser"
}).then((c)=>{console.log(`database connected with ${c.connection.host}`)}).catch((e)=>{console.log(e)})
//mongodb://127.0.0.1:27017
export default mongoose