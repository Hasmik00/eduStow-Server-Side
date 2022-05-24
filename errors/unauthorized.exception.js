class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 401;
    this.message = message;
  }
}

export default UnauthorizedException;
