"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
exports.userRouter = express_1.default.Router();
const userController = new user_controller_1.UserController();
exports.userRouter.post("/add", (req, res, next) => {
    userController.addUser(req, res, next);
});
exports.userRouter.get("/", (req, res, next) => {
    userController.getAllUsers(req, res, next);
});
exports.userRouter.put("/update/:userId", (req, res, next) => {
    userController.updateUser(req, res, next);
});
exports.userRouter.get("/getuser/:userId", (req, res, next) => {
    userController.getUserDetails(req, res, next);
});
exports.userRouter.delete("/delete/:userId", (req, res, next) => {
    userController.deleteUser(req, res, next);
});
