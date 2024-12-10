import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
// Création d'un nouvel objet QueryClient pour gérer les requêtes et la mise en cache avec React Query.
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  // StrictMode est un utilitaire de développement pour détecter certains problèmes dans l'application
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
         {/* Le composant App est rendu ici, qui contient toutes les routes et l'interface de l'application. */}
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
