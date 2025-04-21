import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { MovieProvider } from './context/MovieContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>,
)