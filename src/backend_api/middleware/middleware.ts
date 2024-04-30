import { validationResult } from "express-validator";
import { ErrorRequestHandler, RequestHandler } from "express";

export const handleInputErrors: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    } else {
        next();
    }
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
    res.status(err.statusCode).json({ errors: err.message });
};

export const invalidPathHandler: RequestHandler = (req, res) => {
    res.status(404);
    res.json({ errors: `invalid path:${req.url}` });
};
