class DataBaseError extends Error {
  constructor(error: unknown) {
    super();
    this.name = 'Database Error';
    this.message =
      error instanceof Error ? `Database Error: ${error.message}` : ``;
  }
}
export default DataBaseError;
