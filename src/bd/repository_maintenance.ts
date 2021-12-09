class RepositoryMaintenance<T> {
  base: T[];

  constructor(base: T[]) {
    this.base = base;
  }

  getBd() {
    return this.base;
  }

  findOne<P extends keyof T>(prop: P, necessary: T[P]) {
    return this.base.find((item: T) => item[prop] === necessary);
  }

  findAll<P extends keyof T>(property: P, necessary: T[P]) {
    return this.base.filter((item) => item[property] === necessary);
  }

  findIndex<P extends keyof T>(property: P, necessary: T[P]) {
    return this.base.findIndex((item) => item[property] === necessary);
  }

  add(item: T) {
    this.base.push(item);
  }

  change<P extends keyof T>(property: P, necessary: T[P], replacedBy: T) {
    const index = this.findIndex(property, necessary);

    this.base.splice(index, 1, replacedBy);
  }

  delete<P extends keyof T>(property: P, necessary: T[P]) {
    this.base = this.base.filter((item) => item[property] !== necessary);
  }
}

export default RepositoryMaintenance;
