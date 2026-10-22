// "use strict";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// this is import file syntax.
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
