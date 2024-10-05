import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Assuming the CSS file is already created

const Cutscene = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = (event) => {
      event.preventDefault();
      navigate('/cutscene', { replace: true }); // Redirect to the current page
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackNavigation);

    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [navigate]);

  return (
    <div className="cutscene-container">
      <iframe
        src="https://drive.google.com/file/d/1gZ7-qiJoiqmiCQbIIURuvFK36OXyDTHn/preview"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay"
        title="Cutscene"
      />
      <button className="skip-button" onClick={() => navigate('/role')}>Skip</button>
    </div>
  );
};

export default Cutscene;



