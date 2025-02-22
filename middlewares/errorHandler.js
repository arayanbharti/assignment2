module.exports = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  switch (statusCode) {
    case 400:
      message =
        "Bad Request: The server could not understand the request due to invalid syntax.";
      break;
    case 401:
      message =
        "Unauthorized: Authentication is required to access this resource.";
      break;
    case 403:
      message =
        "Forbidden: You do not have permission to access this resource.";
      break;
    case 404:
      message = "Not Found: The requested resource could not be found.";
      break;
    case 405:
      message =
        "Method Not Allowed: The request method is not supported for the requested resource.";
      break;
    case 408:
      message =
        "Request Timeout: The server timed out waiting for the request.";
      break;
    case 409:
      message =
        "Conflict: The request conflicts with the current state of the server.";
      break;
    case 413:
      message =
        "Payload Too Large: The request entity is larger than the server is willing to process.";
      break;
    case 415:
      message =
        "Unsupported Media Type: The media format of the requested data is not supported by the server.";
      break;
    case 429:
      message =
        "Too Many Requests: The user has sent too many requests in a given amount of time.";
      break;
    case 500:
      message =
        "Internal Server Error: The server encountered a situation it doesn't know how to handle.";
      break;
    case 502:
      message =
        "Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.";
      break;
    case 503:
      message =
        "Service Unavailable: The server is not ready to handle the request.";
      break;
    case 504:
      message =
        "Gateway Timeout: The server was acting as a gateway and did not receive a timely response from the upstream server.";
      break;
  }

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message,
    },
  });
};
