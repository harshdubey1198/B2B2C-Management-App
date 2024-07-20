import React, { useEffect, useState } from 'react';

const rolePermissions = {
  Master: ['View All Data', 'Manage Users', 'Edit Settings'],
  Client_Admin: ['View Client Data', 'Manage Client Users'],
  Firm_Admin: ['View Firm Data', 'Manage Firm Users'],
  Accountant: ['View Financial Data', 'Manage Transactions'],
  GE: ['View General Data']
};

const RolewiseDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem('authUser');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } else {
        const simulatedUser = {
          uid: 1,
          username: "Demo User",
          role: "GE",
          email: "GE123@gmail.com",
        };

        localStorage.setItem('authUser', JSON.stringify(simulatedUser));

        setUser(simulatedUser);
      }
    };

    fetchUser();

    const intervalId = setInterval(fetchUser, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <h2>Role: {user.role}</h2>
          <h3>Permissions:</h3>
          <ul>
            {rolePermissions[user.role].map(permission => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default RolewiseDashboard;
