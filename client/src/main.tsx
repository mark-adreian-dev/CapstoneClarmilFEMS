import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthState } from './context/AuthContext/AuthState.tsx'
import { Toaster } from 'sonner'
import { BrowserRouter } from 'react-router-dom'
import { Theme } from './types/Theme.ts'
import { ThemeProvider } from './components/theme-provider.tsx'
import { EmployeeState } from './context/EmployeeContext/EmployeeState.tsx'
import { IngridientState } from './context/IngridientsContext/IngridientsState.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthState>
          <EmployeeState>
            <IngridientState>
              <Toaster richColors position="top-center" />
              <App />
            </IngridientState>
          </EmployeeState>
        </AuthState> 
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
