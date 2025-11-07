export default function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ success: false, message });
}
