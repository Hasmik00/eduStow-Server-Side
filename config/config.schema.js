import joi from "joi";

export const ConfigSchema = {
  // nodeEnv: Joi.string().valid('dev', 'prod', 'test'),
  // mongoUrl: Joi.string(),
  // port: Joi.number(),
  // url: Joi.string(),
  // globalPrefix: Joi.string(),

  DB_CONNECT: joi.string().required(),
  SECRET_TOKEN: joi.string().required(),
  PORT: joi.number().positive().required(),
};

export default ConfigSchema;
