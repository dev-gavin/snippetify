import { Request } from "express";

export function parseQueries(req: Request, res, next) {
  const parsedQuery = Object.fromEntries(
    Object.entries(req.query).map(([key, value]) => [key, parseValue(value)]),
  );
  req.query = parsedQuery;
  next();
}

function parseValue(value: string) {
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  if (!isNaN(parseInt(value))) return parseInt(value);
  return value;
}
