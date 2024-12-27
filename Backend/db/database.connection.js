import mongoose from "mongoose";
import { DB_NAME } from "./DBname.js";

export const connectDB = async()=>{
   try {
     const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     console.log("Data Base connection successfull HOST !! ",response.connection.host)
   } catch (error) {
    console.log("DB Connection Error ",error)
    process.exit(1)
   }
}