import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import { AuthProvider } from './auth/AuthContext'
import { ClinicProvider } from './data/ClinicContext'
import App from './App'
import './styles/tokens.css'
import './styles/global.css'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ClinicProvider>
          <App />
        </ClinicProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
