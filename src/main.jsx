import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioProvider> 

      <ThemeProvider>
      <App />
      
      </ThemeProvider>  
    </AudioProvider>

  </StrictMode>,
)

//audioProvider--> Manages audio playback globally
//ThemeProvider--> Manages dark and light theme globally