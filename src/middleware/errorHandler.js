const errorHandler = (err, req, res, _next) => {
  if (req && req.log && typeof req.log.error === 'function') req.log.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message });
};

export default errorHandler;
