export const getApiErrorMessage = (
  error,
  fallback
) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (
    error?.code === "ERR_NETWORK" ||
    !error?.response
  ) {
    return "Cannot reach the API server at http://localhost:5001. Make sure the backend is running and that CORS allows your frontend origin.";
  }

  return fallback;
};
