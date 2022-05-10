import joi from "joi";

import ConfigSchema from "./config.schema.js";

class ConfigService {
  constructor() {
    this.DB_CONNECT = process.env.DB_CONNECT;
    this.SECRET_TOKEN = process.env.SECRET_TOKEN;
    this.PORT = process.env.PORT;
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
