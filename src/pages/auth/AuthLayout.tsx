import { Navigate, Outlet } from 'react-router';

import authCss from './auth.module.css';
import { useStore } from '../../store/useStore.ts';

export default function AuthLayout() {
  const uStore = useStore().userStore;
  return uStore.username ? (
    <Navigate to="/" />
  ) : (
    <main className={authCss.layout}>
      <div className={authCss.guts}>
        <Outlet />
      </div>
    </main>
  );
}
