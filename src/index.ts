import dotenv from 'dotenv';
dotenv.config();
import swagger from 'swagger-ui-express';
import express, { Request, Response } from 'express';
import { connectToMongoDB } from './config/db';
import { userRouter } from './features/Users/user.routes';
import apiDocs from '../swagger.json';

export const app = express();

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/docs",swagger.serve,swagger.setup(apiDocs));
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  connectToMongoDB();
})