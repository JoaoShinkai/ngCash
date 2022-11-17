import { Joi } from 'celebrate';

const loginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export default loginUserSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
