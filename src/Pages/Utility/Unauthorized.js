import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // Redirects after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="unauthorized">
      <h1>Unauthorized Access</h1>
      <p>You are not authorized to view this page. Redirecting to the dashboard...</p>
    </div>
  );
};

export default Unauthorized;
