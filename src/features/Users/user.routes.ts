import express,{ NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/add",(req : Request , res :Response ,next : NextFunction) => {
    userController.addUser(req,res,next)
})

userRouter.get("/",(req : Request , res :Response ,next : NextFunction) => {
    userController.getAllUsers(req,res,next)
})

userRouter.put("/update/:userId",(req : Request , res :Response ,next : NextFunction) => {
    userController.updateUser(req,res,next);
})

userRouter.get("/getuser/:userId",(req : Request , res :Response ,next : NextFunction) => {
    userController.getUserDetails(req,res,next);
})

userRouter.delete("/delete/:userId",(req : Request , res :Response ,next : NextFunction) => {
    userController.deleteUser(req,res,next);
})