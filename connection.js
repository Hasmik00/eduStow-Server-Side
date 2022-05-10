import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = mongoose.connect(process.env.DB_CONNECT);

export default dbConnection;
