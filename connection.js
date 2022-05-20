import mongoose from "mongoose";

import ConfigService from "./config/config.service.js";

const dbConnection = mongoose.connect(ConfigService.dbConnection);

export default dbConnection;
