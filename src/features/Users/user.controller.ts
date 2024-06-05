import { NextFunction, Request, Response } from 'express';
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { customErrorHandler } from '../../errorHandler/customErrorHandler';

export class UserController{
    userRepository : UserRepository
    constructor()
    {
        this.userRepository = new UserRepository();
    }

    async addUser(req : Request , res : Response , next : NextFunction)
    {
        try{
            const { name , email , password } = req.body;
            const hashedPassword = await bcrypt.hash(password,12);
            const response = await this.userRepository.addUser({name , email , password : hashedPassword});
            return res.status(201).json({
                success : response.success,
                res : response.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async getAllUsers(req : Request , res : Response , next : NextFunction)
    {
        try{
           const response = await this.userRepository.getAllUsers();
           return res.status(200).json({
            success : response.success,
            res : response.res
        })
        }
        catch(err)
        {
            next(err);
        }
    }

    async updateUser(req : Request , res : Response , next : NextFunction)
    {
        try{
            const userId = req.params.userId;
            const response = await this.userRepository.updateUser(req.body,userId);
            return res.status(200).json({
                success : response.success,
                res : response.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }

    async deleteUser(req : Request , res : Response , next : NextFunction)
    {
        try{
            const response = await this.userRepository.deleteUser(req.params.userId);
            return res.status(200).json({
                success : response.success,
                res : response.res
            })
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

    async getUserDetails(req : Request , res : Response , next : NextFunction)
    {
        try{
            const response = await this.userRepository.getUserDetails(req.params.userId);
            return res.status(200).json({
                success : response.success,
                res : response.res
            })
        }
        catch(err)
        {
            next(err);
        }
    }
}