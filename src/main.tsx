import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from './theme/app_theme.tsx'
import { ServerAddressProvider } from './contexts/ServerAddressProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <ServerAddressProvider>
        <App />
      </ServerAddressProvider>
    </ThemeProvider>
  </StrictMode>
)
