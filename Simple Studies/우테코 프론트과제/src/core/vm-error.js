export default class VMError extends Error {
  constructor(message) {
    super(message);
    this.type = 'VMError';
  }
}
