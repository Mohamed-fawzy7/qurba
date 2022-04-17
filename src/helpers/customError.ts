interface ErrorObject {
  code: string;
  message: string;
  param?: string | number;
}

export default class CustomError extends Error {
  errorObject;
  status;
  statusCode;
  constructor(errorObject: ErrorObject, statusCode: number) {
    super('Custom error created');
    this.name = 'CustomError';
    this.errorObject = errorObject;
    this.status = false;
    this.statusCode = statusCode;
  }

  getErrorResponse() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      errors: [this.errorObject],
    };
  }
}
