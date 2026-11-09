import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WatchlistProvider } from './state/WatchlistContext'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </BrowserRouter>
  </React.StrictMode>
)