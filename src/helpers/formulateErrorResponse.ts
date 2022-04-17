import CustomError from './customError';

export default (error: any) => {
  if (error.name === 'CustomError') {
    return error.getErrorResponse();
  }

  //should add logger to alert for errors not created on purpose
  console.log(error);
  return {
    status: false,
    statusCode: 500,
    errors: [{ message: error.message }],
  };
};
