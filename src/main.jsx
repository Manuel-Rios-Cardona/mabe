import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Fix 100vh en iOS Safari — la variable --vh se actualiza con la altura real
function setVh() {
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px')
}
setVh()
window.addEventListener('resize', setVh)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
