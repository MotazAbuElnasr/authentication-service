class CustomError extends Error {
  constructor(status, code, message, details = []) {
    super();
    Object.assign(this, {
      status,
      code,
      details,
      message,
    });
  }
}

module.exports = ({
  AuthenticationError: (message) =>
    new CustomError(401, "AUTHENTICATION", message),
});
