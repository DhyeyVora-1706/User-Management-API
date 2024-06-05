"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const user_routes_1 = require("./features/Users/user.routes");
const swagger_json_1 = __importDefault(require("../swagger.json"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/users", user_routes_1.userRouter);
exports.app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.app.listen(3000, () => {
    console.log('Server is running on port 3000');
    (0, db_1.connectToMongoDB)();
});
