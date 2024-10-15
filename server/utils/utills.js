// Function to create a standardized response structure
function createResult(message, data, error) {
  return {
    message: message || null,
    data: data || null,
    error: error ? true : false 
  };
}

// Export the function
module.exports = {
  createResult
};
