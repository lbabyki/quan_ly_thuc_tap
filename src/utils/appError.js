export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}
