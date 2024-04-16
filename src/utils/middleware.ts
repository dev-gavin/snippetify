export function parseQueries(req, res, next) {
  const parsedQuery = Object.fromEntries(
    Object.entries(req.query).map(([key, value]) => [
      key,
      parseValue(value as string),
    ]),
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
