import Joi from '@hapi/joi';
import CustomError from './customError';

export default (validationResult: Joi.ValidationResult) => {
  validationResult;
  if (
    validationResult &&
    validationResult.error &&
    validationResult.error.details &&
    validationResult.error.details.length
  ) {
    const { details } = validationResult.error;
    const JoiError = {
      param: details[0].path[0],
      message: details[0].message.replace(/['"]/gu, ''),
      code: '',
    };

    throw new CustomError(JoiError, 400);
  }
};
