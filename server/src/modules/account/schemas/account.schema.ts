import Joi from 'joi';

const createAccountSchema = Joi.object({});

export default createAccountSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
