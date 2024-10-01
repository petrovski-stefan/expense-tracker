import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './auth-context/AuthProvider.tsx';
import CurrencyProvider from './currency-context/CurrencyProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CurrencyProvider>
        <Router>
          <App />
        </Router>
      </CurrencyProvider>
    </AuthProvider>
  </StrictMode>
);
