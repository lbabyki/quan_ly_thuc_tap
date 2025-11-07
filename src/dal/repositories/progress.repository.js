import { BaseRepository } from "../../core/base/BaseRepository.js";
import Progress from "../models/progress.model.js";
export class ProgressRepository extends BaseRepository {
  constructor() {
    super(Progress);
  }
}
