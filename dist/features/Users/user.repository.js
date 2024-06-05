"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const customErrorHandler_1 = require("../../errorHandler/customErrorHandler");
const user_schema_1 = require("./user.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel = mongoose_1.default.model("user", user_schema_1.userSchema);
class UserRepository {
    addUser(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new UserModel(userObj);
                yield newUser.save();
                return { success: true, res: newUser };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel.find({});
                return { success: true, res: users };
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    updateUser(updatedUser, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validUserId = yield UserModel.findById(userId);
                if (!validUserId) {
                    throw new customErrorHandler_1.customErrorHandler("UserId not Found", 404);
                }
                else {
                    const resp = yield UserModel.findByIdAndUpdate(userId, updatedUser, { new: true });
                    return { success: true, res: resp };
                }
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validUserId = yield UserModel.findById(userId);
                if (!validUserId) {
                    throw new customErrorHandler_1.customErrorHandler("UserId Not Found", 404);
                }
                else {
                    const deletedUser = yield UserModel.findByIdAndDelete(userId);
                    return { success: true, res: deletedUser };
                }
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
    getUserDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validUserId = yield UserModel.findById(userId);
                if (!validUserId) {
                    throw new customErrorHandler_1.customErrorHandler("UserId Not Found", 404);
                }
                else {
                    const deletedUser = yield UserModel.findByIdAndDelete(userId);
                    return { success: true, res: deletedUser };
                }
            }
            catch (err) {
                if (err instanceof customErrorHandler_1.customErrorHandler) {
                    throw new customErrorHandler_1.customErrorHandler(err.message, err.code);
                }
                throw new Error(err.message);
            }
        });
    }
}
exports.UserRepository = UserRepository;
