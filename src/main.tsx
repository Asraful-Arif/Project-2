
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { ProjectProvider } from './components/ui/ProjectContext.tsx'


createRoot(document.getElementById('root')!).render(
  <ProjectProvider>
    <App/>
     <Toaster richColors position='top-right' />
  </ProjectProvider>
)
