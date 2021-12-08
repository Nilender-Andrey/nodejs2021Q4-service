import { IBoard, ITask, IUser } from '../types/types';

// type T = IUser[] | IBoard[] | ITask[];
type T = keyof IUser | IBoard | ITask;

class RepositoryMaintenance<T, K extends keyof T> {
  base: Array<T>;

  constructor(base: Array<T>) {
    this.base = base;
  }

  getBd() {
    return this.base;
  }

  findOne(property: K, necessary: T[K]) {
    return this.base.find((item: T) => item[property] === necessary);
  }

  findAll<U extends keyof T>(property: U, necessary: string) {
    return this.base.filter((item) => item[property] === necessary);
  }

  findIndex<U extends keyof T>(property: U, necessary: string) {
    return this.base.findIndex((item) => item[property] === necessary);
  }

  add(item: T) {
    this.base.push(item);
  }

  change<U extends keyof T>(
    property: U,
    necessary: string,
    replacedBy: IBoard | IUser | ITask
  ) {
    const index = this.findIndex(property, necessary);

    this.base.splice(index, 1, replacedBy);
  }

  delete<U extends keyof T>(property: U, necessary: string) {
    this.base = this.base.filter((item) => item[property] !== necessary);
  }
}

export default RepositoryMaintenance;
