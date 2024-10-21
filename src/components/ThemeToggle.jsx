import React, { useState } from 'react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
