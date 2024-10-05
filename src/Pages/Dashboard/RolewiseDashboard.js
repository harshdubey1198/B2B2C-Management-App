// import React, { useEffect, useState } from 'react';

// const rolePermissions = {
//   super_admin: ['View All Data', 'Manage Users', 'Edit Settings'],
//   client_admin: ['View Client Data', 'Manage Client Users'],
//   firm_Admin: ['View Firm Data', 'Manage Firm Users'],
//   accountant: ['View Financial Data', 'Manage Transactions'],
//   GE: ['View General Data']
// };

// const RolewiseDashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = () => {
//       const storedUser = localStorage.getItem('authUser');
      
//       if (storedUser) {
//         const userData = JSON.parse(storedUser);
//         setUser(userData);
//       } else {
//         const simulatedUser = {
//           uid: 1,
//           username: "Demo User",
//           role: "GE",
//           email: "GE123@gmail.com",
//         };

//         localStorage.setItem('authUser', JSON.stringify(simulatedUser));

//         setUser(simulatedUser);
//       }
//     };

//     fetchUser();

//     const intervalId = setInterval(fetchUser, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h1>Welcome, {user.username}</h1>
//           <h2>Role: {user.role}</h2>
//           <h3>Permissions:</h3>
//           <ul>
//             {rolePermissions[user.role].map(permission => (
//               <li key={permission}>{permission}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div>Loading user data...</div>
//       )}
//     </div>
//   );
// };

// export default RolewiseDashboard;













import React, { useEffect, useState } from 'react';

const rolePermissions = {
  super_admin: ['View All Data', 'Manage Users', 'Edit Settings'],
  client_admin: ['View Client Data', 'Manage Client Users'],
  firm_admin: ['View Firm Data', 'Manage Firm Users'],
  accountant: ['View Financial Data', 'Manage Transactions'],
  employee: ['View General Data']
};

const RolewiseDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem('authUser');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData?.response);
      } else {
        const simulatedUser = {
          uid: 1,
          username: "Demo User",
          role: "employee",
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
    <div className='d-flex flex-row w-100'>
      {user ? (
        <div className='d-flex flex-row w-100 justify-content-evenly align-items-center'>
          <h4 className="m-0 mb-1">Welcome {user.firstName}</h4>
          <h5 className="m-0 mb-1">Role: {user.role}</h5>
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default RolewiseDashboard;

