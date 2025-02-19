import { Navigate, Outlet } from 'react-router';

import authCss from './auth.module.css';
import { useStore } from '../../store/useStore.ts';
import { observer } from 'mobx-react-lite';

const AuthLayout = observer(() => {
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
});

export default AuthLayout;
