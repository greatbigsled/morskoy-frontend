import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { store } from './store/store';
import { StoreContext } from './store/context/store.ts';
import './index.css';
import App from './App.tsx';
import Login from './auth/Login.tsx';
import Register from './auth/Register.tsx';
import AuthLayout from './auth/AuthLayout.tsx';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />

          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  </StrictMode>,
);
