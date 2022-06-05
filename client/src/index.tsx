/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthOProviderWithHistory from './auth0-provider-with-history.js';
import {Auth0Provider} from '@auth0/auth0-react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
      <Auth0Provider domain={'dev-u7jhkdqg.us.auth0.com'} clientId={'xYZYgyAG4jAIQxlRqdOv8hkbPGCFivKh'}>
        <App />
      </Auth0Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
