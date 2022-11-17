import Joi from 'joi';

const createTransactionSchema = Joi.object({
  creditUsername: Joi.string().required(),
  value: Joi.number().required()
});

export default createTransactionSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
