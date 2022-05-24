class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
    this.message = message;
  }
}

export default NotFoundException;
