class errorhandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    this.name = "ErrorHandler";
    // Error.captureStackTrace(this, errorhandler);
  }
}

export default errorhandler;
