import { BaseRepository } from "../../core/base/BaseRepository.js";
import Internship from "../models/internship.model.js";
export class InternshipRepository extends BaseRepository {
  constructor() {
    super(Internship);
  }
}
