import { sendSuccess } from "../../utils/response.js";

export function healthController(req, res) {
  return sendSuccess(res, {
    message: "System is healthy!",
    data: { time: new Date().toISOString() },
  });
}
