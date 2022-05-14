import mongoose from "mongoose";
import dotenv from "dotenv";

import ConfigService from "./config/config.service.js";
dotenv.config();

const dbConnection = mongoose.connect(process.env.DB_CONNECT);

export default dbConnection;
