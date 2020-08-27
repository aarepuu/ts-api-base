import Joi from '@hapi/joi'

export const loginUserModel = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .trim()
    .required(),
  rememberMe: Joi.boolean()
})

export const twofaValidator = Joi.object({
  // should be number
  code: Joi.string().required(),
  rememberDevice: Joi.boolean()
}).unknown()

export const twofaRecoveryValidator = Joi.object({
  recoveryCode: Joi.string().required()
}).unknown()

export const jwtValidator = Joi.object({
  authorization: Joi.string().required()
}).unknown()
