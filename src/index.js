// src/index.js or src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>  // ⬅️ Comment this out
    <App />
  // </React.StrictMode>
);
