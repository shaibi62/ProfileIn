// src/main.jsx
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import {TemplateProvider} from './contexts/handleTemplates'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
        <TemplateProvider>
        <App />
        </TemplateProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

