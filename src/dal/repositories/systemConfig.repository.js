import { BaseRepository } from "../../core/base/BaseRepository.js";
import SystemConfig from "../models/systemConfig.model.js";

export class SystemConfigRepository extends BaseRepository {
  constructor() {
    super(SystemConfig);
  }

  async getActiveSemester() {
    return this.model.findOne({ isActive: true });
  }

  async deactivateAll() {
    return this.model.updateMany({}, { isActive: false });
  }
}