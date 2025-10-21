function handleSuccess(res, statusCode, message, data = {}) {
  return res.status(statusCode).json({
    status: "Success",
    message,
    data,
  });
}

function handleErrorClient(res, statusCode, message, details= {}) {
  return res.status(statusCode).json({
    status: "Client error",
    message,
    details
  });
}

function handleErrorServer(res, statusCode, message) {
  return res.status(statusCode).json({
    status: "Server error",
    message,
  });
}

export { handleSuccess, handleErrorClient, handleErrorServer };