/** Class represents methods for working with bases. */
class RepositoryMaintenance<T> {
  base: T[];

  /**
   * Connects base to methods
   * @param base - array database {array}
   */

  constructor(base: T[]) {
    this.base = base;
  }

  /**
   * Getting all data from a database
   * @returns All data from the database {array}
   */
  getBd(): T[] {
    return this.base;
  }

  /**
   * Search one match
   * @param property - the field by which we are looking {string}
   * @param necessary - what value are we looking for {string}
   * @returns search result or undefined {object | undefined}
   */

  findOne<P extends keyof T>(property: P, necessary: T[P]): T | undefined {
    return this.base.find((item: T) => item[property] === necessary);
  }

  /**
   * Search all matches
   * @param property - the field by which we are looking {string}
   * @param necessary - what value are we looking for {string}
   * @returns array of results {array}
   */

  findAll<P extends keyof T>(property: P, necessary: T[P]): T[] {
    return this.base.filter((item) => item[property] === necessary);
  }

  /**
   * Get the index of an element in the database
   * @param property - the field by which we are looking {string}
   * @param necessary - what value are we looking for {string}
   * @returns the index of the element found or -1 {number}
   */

  findIndex<P extends keyof T>(property: P, necessary: T[P]): number {
    return this.base.findIndex((item) => item[property] === necessary);
  }

  /**
   * Adds an element to the base
   * @param item - the item to add {object}
   * @returns nothing
   */

  add(item: T): void {
    this.base.push(item);
  }

  /**
   * Changes an element in the base
   * @param property - the field by which we are looking {string}
   * @param necessary - what value are we looking for {string}
   * @param replacedBy - new value {object}
   * @returns nothing
   */

  change<P extends keyof T>(property: P, necessary: T[P], replacedBy: T): void {
    const index = this.findIndex(property, necessary);

    this.base.splice(index, 1, replacedBy);
  }

  /**
   * Removes an element from the base
   * @param property - the field by which we are looking {string}
   * @param necessary - what value are we looking for {string}
   * @returns nothing
   */

  delete<P extends keyof T>(property: P, necessary: T[P]): void {
    this.base = this.base.filter((item) => item[property] !== necessary);
  }
}

export default RepositoryMaintenance;
