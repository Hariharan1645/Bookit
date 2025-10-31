import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* added: page background and min height so main content sits on subtle gray */}
      <div className="bg-gray-50 min-h-screen">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)
