import express from "express";
import {config} from "dotenv"
import mongoose from "./server.js";
import cookieParser from "cookie-parser";
import userroutes from "./routes/user.route.js"
import blogroutes from "./routes/blog.route.js"
import bodyParser from "body-parser";
import cors from "cors"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app=express();
config({
    path: "./data/config.env",
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors({
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',userroutes);
app.use('/',blogroutes);
app.get('/',(req,res)=>{
    res.send("hii");
})
//console.log(process.env.MONGO_URI)
app.listen(process.env.PORT, () => {
    console.log(
      `Server is working on port:${process.env.PORT} in Mode`
    );
  });
export default app