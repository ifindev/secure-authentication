import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { ZodError } from 'zod';
import HttpError from '../errors/http.error';

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    const formattedErrors: Record<string, string> = {};

    error.issues.forEach((issue) => {
      const field = issue.path.join('.');
      if (!formattedErrors[field]) {
        formattedErrors[field] = issue.message;
      }
    });

    res.status(status.BAD_REQUEST).json({
      errors: formattedErrors,
    });
  } else if (error instanceof HttpError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      errors: error.message,
    });
  }
};
