import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css'; // <-- This is the missing link that applies your styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);