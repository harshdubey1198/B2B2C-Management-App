// Function to create a standardized response structure
function createResult(message, data, error) {
  return {
    message: message,
    data: data || null,
    error: error || null
  };
}

// Export the function
module.exports = {
  createResult
};

