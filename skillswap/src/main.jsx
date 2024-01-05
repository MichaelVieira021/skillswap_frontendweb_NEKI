import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './components/GlobalStyle.jsx'
import AppRouter from './routes/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle/>
    <AppRouter />
  </React.StrictMode>,
)
