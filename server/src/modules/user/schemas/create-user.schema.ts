import { Joi } from 'celebrate';

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export default createUserSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
