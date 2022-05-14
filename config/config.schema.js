import joi from "joi";

export const ConfigSchema = {
  dbConnection: joi.string().required(),
  secretToken: joi.string().required(),
  port: joi.number().positive().required(),
};

export default ConfigSchema;
