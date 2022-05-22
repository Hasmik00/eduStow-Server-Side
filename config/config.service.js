import joi from "joi";
import dotenv from "dotenv";

import ConfigSchema from "./config.schema.js";
import ValidationError from "../errors/validation.error.js";
dotenv.config();

class ConfigService {
  constructor() {
    this.dbConnection = process.env.DB_CONNECT;
    this.secretToken = process.env.SECRET_TOKEN;
    this.port = process.env.PORT;
  }

  isValid() {
    const schema = joi.object(ConfigSchema);
    const { error } = schema.validate(this, { stripUnknown: true });

    if (error) {
      throw new ValidationError(`Config validation error: ${error.message}`);
    }

    return !error;
  }
}

export default new ConfigService();
