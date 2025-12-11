export class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    return this.model.create(data);
  }
  async findById(id) {
    return this.model.findById(id);
  }
  async findOne(filter) {
    return this.model.findOne(filter);
  }
  async find(filter = {}) {
    return this.model.find(filter);
  }
  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }
}
