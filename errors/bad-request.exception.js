class BadRequestException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 400;
    this.message = message;
  }
}

export default BadRequestException;
