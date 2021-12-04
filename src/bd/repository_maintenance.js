module.exports = class RepositoryMaintenance {
  constructor(base) {
    this.base = base;
  }

  getBd() {
    return this.base;
  }

  findOne(property, necessary) {
    return this.base.find((item) => item[property] === necessary);
  }

  findAll(property, necessary) {
    return this.base.filter((item) => item[property] === necessary);
  }

  findIndex(property, necessary) {
    return this.base.findIndex((item) => item[property] === necessary);
  }

  add(item) {
    this.base.push(item);
  }

  change(property, necessary, replacedBy) {
    const index = this.findIndex(property, necessary);

    this.base.splice(index, 1, replacedBy);
  }

  delete(property, necessary) {
    // const index = this.findIndex(property, necessary);
    // this.base.splice(index, 1);

    this.base = this.base.filter((item) => item[property] !== necessary);
  }
};
