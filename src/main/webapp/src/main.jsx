import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registrovan sa uspehom:', registration);
    })
    .catch(error => {
      console.error('Greška prilikom registracije Service Workera:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
