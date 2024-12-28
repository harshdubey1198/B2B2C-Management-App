let Role = null;

// Initialize role from localStorage
export const initializeRole = () => {
  Role = JSON.parse(localStorage.getItem('authUser'))?.response?.role || null;
};

// Update role dynamically
export const setRole = (newRole) => {
  Role = newRole;
  const authUser = JSON.parse(localStorage.getItem('authUser')) || {};
  authUser.response = { ...authUser.response, role: newRole };
  localStorage.setItem('authUser', JSON.stringify(authUser));
};

export const getRole = () => Role;
