// Micro Visual System — entry
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './foundations/tokens.css'
import './foundations/typography.css'
import './foundations/motion.css'
import './foundations/reset.css'
import './components/core.css'
import './components/financial.css'
import './components/contextual.css'
import './navigation/navigation.css'
import './screens/screens.css'
import './studio/studio.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root container missing')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
