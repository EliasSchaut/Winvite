import * as Joi from 'joi';

export const config_validation_schema = Joi.object({
  PROJECT_NAME: Joi.string().required().description('The name of the project'),
  PORT: Joi.number()
    .required()
    .default('3000')
    .port()
    .description('The port the server should listen on'),
  DATABASE_URL: Joi.string()
    .required()
    .default('file:./dev.db')
    .description('The URL of the database'),
  JWT_SECRET: Joi.string()
    .required()
    .default('secret')
    .description(
      'The secret used to sign the JWT tokens. The JWT tokens are used to authenticate the users',
    ),
  JWT_EXPIRATION: Joi.string()
    .required()
    .default('2h')
    .description('The expiration time of the JWT tokens'),
});
