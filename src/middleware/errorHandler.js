import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  if (req && req.log && typeof req.log.error === 'function') req.log.error(err);
  const status =
    err instanceof HttpError ? err.status : err.status || err.statusCode || 500;
  const message =
    err instanceof HttpError
      ? err.message
      : err.message || 'Internal Server Error';
  res.status(status).json({ message });
};
