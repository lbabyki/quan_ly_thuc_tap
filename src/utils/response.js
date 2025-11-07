export function sendSuccess(
  res,
  { status = 200, message = "OK", data = null } = {}
) {
  return res.status(status).json({ success: true, message, data });
}

export function sendError(
  res,
  { status = 500, message = "Server Error", details = null } = {}
) {
  return res.status(status).json({ success: false, message, details });
}
