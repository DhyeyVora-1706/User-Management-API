import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

export async function connectToMongoDB() : Promise<void>{
    try{
      await mongoose.connect("mongodb://localhost:27017/user_management");
      console.log('Connected to MongoDB');
    }
    catch(err)
    {
      console.log(err);
    }
  }