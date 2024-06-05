import { customErrorHandler } from "../../errorHandler/customErrorHandler";
import { userSchema } from "./user.schema";
import mongoose from "mongoose";

const UserModel = mongoose.model("user",userSchema);

export class UserRepository{
    async addUser(userObj : {name:string , email : string , password : string}):Promise< { success : boolean ; res : any } >
    {
        try{
            const newUser = new UserModel(userObj);
            await newUser.save();
            return { success : true , res : newUser }
        }
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async getAllUsers():Promise< { success : boolean ; res : any } >
    {
        try{
            const users = await UserModel.find({});
            return { success : true , res : users }
        }
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async updateUser(updatedUser : { name:string , email : string , password : string },userId : string) : Promise< {success : boolean ; res : any} >
    {
        try{
            const validUserId = await UserModel.findById(userId);
            if(!validUserId)
            {
                throw new customErrorHandler("UserId not Found",404);
            }
            else
            {
                const resp = await UserModel.findByIdAndUpdate(userId,updatedUser,{ new:true });
                return { success : true , res : resp }
            }
        }
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async deleteUser(userId:string) : Promise< { success : boolean , res : any } >
    {
        try{
            const validUserId = await UserModel.findById(userId);
            if(!validUserId)
            {
                throw new customErrorHandler("UserId Not Found",404);
            }
            else
            {
                const deletedUser = await UserModel.findByIdAndDelete(userId);
                return { success : true , res : deletedUser }
            }
        }
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }

    async getUserDetails(userId : string) : Promise < {success : boolean , res : any} >
    {
        try{
            const validUserId = await UserModel.findById(userId);
            if(!validUserId)
            {
                throw new customErrorHandler("UserId Not Found",404);
            }
            else
            {
                const deletedUser = await UserModel.findByIdAndDelete(userId);
                return { success : true , res : deletedUser }
            }
        }
        catch(err : any)
        {
            if(err instanceof customErrorHandler)
            {
                throw new customErrorHandler(err.message,err.code);
            }

            throw new Error(err.message);
        }
    }
}
