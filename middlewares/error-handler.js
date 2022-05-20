import NotFoundError from "../errors/not-found.error.js";
import UnauthorizedError from "../errors/unauthorized.error.js";
import ValidationError from "../errors/validation.error.js";

const errorHandler = async (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).send(err.message);
  }

  if (err instanceof ValidationError) {
    return res.status(400).send(err.message);
  }

  res.status(500).send("Some error occured");
  next(err);
};

export default errorHandler;
