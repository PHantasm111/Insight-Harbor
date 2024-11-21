import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../index.css'; 

import { ThemeProvider } from "@material-tailwind/react";
import { AuthContexProvider } from './context/authContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContexProvider>
        <App />
      </AuthContexProvider>
    </ThemeProvider>
  </React.StrictMode>
);