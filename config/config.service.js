import joi from "joi";
import dotenv from "dotenv";

import ConfigSchema from "./config.schema.js";
import BadRequestException from "../errors/bad-request.exception.js";
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
      throw new BadRequestException(
        `Config validation error: ${error.message}`
      );
    }

    return !error;
  }
}

export default new ConfigService();
