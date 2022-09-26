import { Request, Response, NextFunction } from "express";
import HttpsException from "../utils/exceptions/http.exception";

function errorMiddleware(
  error: HttpsException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const errors = error.errors || [];

  res.status(status).send({ status, message, errors });
}

export default errorMiddleware;
