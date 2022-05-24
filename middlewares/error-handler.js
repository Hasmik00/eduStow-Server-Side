import NotFoundException from "../errors/not-found.exception.js";
import UnauthorizedException from "../errors/unauthorized.exception.js";
import BadRequestException from "../errors/bad-request.exception.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  let response = {};

  if (err instanceof NotFoundException) {
    // todo: the best way could be determine http exceptions
    response = {
      status: statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
  } else if (err instanceof UnauthorizedException) {
    response = {
      status: statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
  } else if (err instanceof BadRequestException) {
    response = {
      status: statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
  } else if (err instanceof Error) {
    response = {
      status: statusCode,
      message,
      details: {
        stack: err.stack,
      },
    };
  } else {
    response = {
      status: 500,
      message: "Unhandled exception",
      timestamp: new Date().toISOString(),
    };
  }

  res.status(statusCode).send(response);
  next(err);
};
