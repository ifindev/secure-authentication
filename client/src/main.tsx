import { createRoot } from 'react-dom/client';
import ContainerApp from './app/container.app.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<ContainerApp />);
