import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import OrganizationProvider from './components/OrganizationContext';
import TeamProvider from './components/TeamContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <OrganizationProvider>
      <TeamProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TeamProvider>
    </OrganizationProvider>
  </BrowserRouter>
)


