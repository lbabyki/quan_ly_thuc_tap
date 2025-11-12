// src/ui/controllers/internship.controller.js
import { sendSuccess, sendError } from "../../utils/response.js";
import { InternshipService } from "../../bll/services/internship.service.js";
import {
  registerValidator,
  suggestValidator,
} from "../../bll/validators/internship.validator.js";

const service = new InternshipService();

export class InternshipController {
  // list all available internships (open)
  static async listAvailable(req, res) {
    try {
      const list = await service.listAvailable();
      return sendSuccess(res, { data: list });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // student registers to internshipId (optionally upload doc)
  static async register(req, res) {
    try {
      const body = { internshipId: req.params.id, ...req.body };
      const { error } = registerValidator.validate(body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });

      // optional uploaded file
      let docUrl = null;
      if (req.file) {
        docUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      }

      const updated = await service.registerByStudent(
        req.user._id,
        body.internshipId,
        docUrl
      );
      return sendSuccess(res, {
        message: "Registered to internship",
        data: updated,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // student suggests a topic
  static async suggestTopic(req, res) {
    try {
      const { error } = suggestValidator.validate(req.body);
      if (error)
        return sendError(res, {
          status: 400,
          message: error.details[0].message,
        });

      const suggestion = await service.suggestTopic(req.user._id, req.body);
      return sendSuccess(res, {
        status: 201,
        message: "Topic suggested",
        data: suggestion,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // get my internship (student)
  static async my(req, res) {
    try {
      const rec = await service.getMyInternship(req.user._id);
      return sendSuccess(res, { data: rec });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // admin: list all internships (existing)
  static async listAll(req, res) {
    try {
      const list = await service.list();
      return sendSuccess(res, { data: list });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
  // Danh sách đề xuất chờ duyệt (admin)
  static async listSuggestions(req, res) {
    try {
      const list = await service.listSuggestions();
      return sendSuccess(res, { data: list });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }

  // Duyệt đề xuất: approve = true/false
  static async reviewSuggestion(req, res) {
    try {
      const { id } = req.params;
      const { approve } = req.body;

      if (typeof approve !== "boolean") {
        return sendError(res, {
          status: 400,
          message: "approve must be boolean",
        });
      }

      const updated = await service.reviewSuggestion(id, approve);
      return sendSuccess(res, {
        message: `Suggestion ${approve ? "approved" : "rejected"}`,
        data: updated,
      });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
  static async cancelRegistration(req, res) {
    try {
      await service.cancelRegistration(req.user._id);
      return sendSuccess(res, { message: "Cancelled internship registration" });
    } catch (err) {
      return sendError(res, { message: err.message });
    }
  }
}
