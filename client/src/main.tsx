import './index.css';

import { createRoot } from 'react-dom/client';

import ContainerApp from './app/container.app.tsx';

createRoot(document.getElementById('root')!).render(<ContainerApp />);
