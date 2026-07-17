import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  status?: number;
  details?: string;
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
  console.error('❌ Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || null;

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      ...(details && { details })
    }
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
