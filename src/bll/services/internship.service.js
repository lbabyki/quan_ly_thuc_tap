import { InternshipRepository } from "../../dal/repositories/internship.repository.js";
export class InternshipService {
  constructor() {
    this.repo = new InternshipRepository();
  }
  async create(data) {
    return this.repo.create(data);
  }
  async getById(id) {
    return this.repo.findById(id);
  }
  async list() {
    return this.repo.find();
  }
}
