import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const RoleAssignment = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const assignedRole = Math.random() < 0.5 ? "farmer" : "thief";
    setRole(assignedRole);

    const timer = setTimeout(() => {
      navigate(`/gameplay/${assignedRole}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const handleBackNavigation = (event) => {
      event.preventDefault();
      navigate('/role', { replace: true }); // Redirect to the current page
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [navigate]);

  return (
    <div className="role-container">
      <h1>Assigning Role...</h1>
      {role && <p>You are a {role}!</p>}
    </div>
  );
};

export default RoleAssignment;
