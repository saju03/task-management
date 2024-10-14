import { NextFunction, Request, Response } from "express";

export const errorHandlers = (
  err: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = err?.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "An unexpected error occurred",
  });
};
