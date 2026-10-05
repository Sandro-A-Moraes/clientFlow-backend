import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error.js';
import { ZodError } from 'zod';

function getClientErrorStatus(err: unknown): number | undefined {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const status = err.status;
    if (typeof status === 'number' && status >= 400 && status < 500) {
      return status;
    }
  }
  return undefined;
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'Validation error', issues: err.issues });
  }

  const clientErrorStatus = getClientErrorStatus(err);

  if (clientErrorStatus == 413) {
    return res.status(413).json({ message: 'Body too large' });
  }

  if (clientErrorStatus !== undefined) {
    return res.status(clientErrorStatus).json({ message: 'Invalid request' });
  }

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
}
