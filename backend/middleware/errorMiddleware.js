const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${(req, originalUrl)}`);
  res.status(404);
  next();
};

const errorHandler = (err, req, res, next) => {
  // set the status code to 500 (Server Error) if not set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  // return the error message and stack trace (if in developmennt mode)
  // The error message can be set by throwing a new Error
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

export { notFound, errorHandler };
