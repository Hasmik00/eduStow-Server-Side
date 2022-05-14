import joi from "joi";

import ConfigSchema from "./config.schema.js";

class ConfigService {
  constructor() {
    this.dbConnection = process.env.DB_CONNECT;
    this.secretToken = process.env.SECRET_TOKEN;
    this.port = process.env.PORT;
  }

  isValid() {
    const schema = joi.object(ConfigSchema).unknown();

    const { error } = schema.validate(this, { stripUnknown: true });

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }
}

export default new ConfigService();
