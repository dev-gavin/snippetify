import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function handleInputErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
}

export function errorHandler(err, req: Request, res: Response) {
  res.status(err.statusCode).json({ errors: err.message });
}

export function invalidPathHandler(req: Request, res: Response) {
  res.status(404);
  res.json({ errors: `invalid path:${req.url}` });
}
