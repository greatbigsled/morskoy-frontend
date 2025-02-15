import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { store } from './store/store';
import { StoreContext } from './store/context/store.ts';
import './index.css';
import App from './App.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>,
);
