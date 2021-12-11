/** Class represents methods for working with bases. */
class RepositoryMaintenance<T> {
  base: T[];

  /**
   * Connects base to methods
   * @param base - database
   */

  constructor(base: T[]) {
    this.base = base;
  }

  /**
   * Getting all data from a database
   * @returns All data from the database
   */

  getBd(): T[] {
    return this.base;
  }

  /**
   * Search one match in the database
   * @param property - the field by which we are looking
   * @param necessary - what value are we looking for
   * @returns search result or undefined
   */

  findOne<P extends keyof T>(property: P, necessary: T[P]): T | undefined {
    return this.base.find((item: T) => item[property] === necessary);
  }

  /**
   * Search all matches in the database
   * @param property - the field by which we are looking
   * @param necessary - what value are we looking for
   * @returns array of results
   */

  findAll<P extends keyof T>(property: P, necessary: T[P]): T[] {
    return this.base.filter((item) => item[property] === necessary);
  }

  /**
   * Get the index of an element in the database
   * @param property - the field by which we are looking
   * @param necessary - what value are we looking for
   * @returns the index of the element found or -1
   */

  findIndex<P extends keyof T>(property: P, necessary: T[P]): number {
    return this.base.findIndex((item) => item[property] === necessary);
  }

  /**
   * Adds an element to the base
   * @param item - the item to add
   * @returns nothing
   */

  add(item: T): void {
    this.base.push(item);
  }

  /**
   * Changes an element in the database
   * @param property - the field by which we are looking
   * @param necessary - what value are we looking for
   * @param replacedBy - new value
   * @returns nothing
   */

  change<P extends keyof T>(property: P, necessary: T[P], replacedBy: T): void {
    const index = this.findIndex(property, necessary);

    this.base.splice(index, 1, replacedBy);
  }

  /**
   * Removes an element from the database
   * @param property - the field by which we are looking
   * @param necessary - what value are we looking for
   * @returns nothing
   */

  delete<P extends keyof T>(property: P, necessary: T[P]): void {
    this.base = this.base.filter((item) => item[property] !== necessary);
  }
}

export default RepositoryMaintenance;
