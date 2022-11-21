import { Joi } from 'celebrate';

const createUserSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(8)
});

export default createUserSchema.options({
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
});
