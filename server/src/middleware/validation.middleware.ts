import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import HttpsException from "../utils/exceptions/http.exception";

function validationMiddleware(
  schema: Joi.Schema,
  reqKey: "body" | "query" = "body"
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false, //finds all validation errors instead of stopping on the first one and returning
      allowUnknown: true, //allow values that aren't part of the schema (otherwise it fails the validation)
      stripUnknown: true, //stripping all unknown values from input
    };
    try {
      const value = await schema.validateAsync(req[reqKey], validationOptions);
      req[reqKey] = value;
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      next(new HttpsException(400, "Bad request", errors));
    }
  };
}

export default validationMiddleware;
