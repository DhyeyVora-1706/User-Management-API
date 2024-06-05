"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_repository_1 = require("./user.repository");
const bcrypt = __importStar(require("bcrypt"));
const customErrorHandler_1 = require("../../errorHandler/customErrorHandler");
class UserController {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const hashedPassword = yield bcrypt.hash(password, 12);
                const response = yield this.userRepository.addUser({ name, email, password: hashedPassword });
                return res.status(201).json({
                    success: response.success,
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getAllUsers();
                return res.status(200).json({
                    success: response.success,
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const response = yield this.userRepository.updateUser(req.body, userId);
                return res.status(200).json({
                    success: response.success,
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.deleteUser(req.params.userId);
                return res.status(200).json({
                    success: response.success,
                    res: response.res
                });
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    getUserDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userRepository.getUserDetails(req.params.userId);
                return res.status(200).json({
                    success: response.success,
                    res: response.res
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
