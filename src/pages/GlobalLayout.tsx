import { NavLink, Outlet } from 'react-router';

import css from './globalLayout.module.css';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore.ts';
import { observer } from 'mobx-react-lite';

const GlobalLayout = observer(() => {
  const { t } = useTranslation();
  const uStore = useStore().userStore;
  const onLogout = () => {
    uStore.logout();
  };

  return (
    <main className={css.main}>
      <header className={css.header}>
        <span className={css.headerTitle}>{t('gameTitle')}</span>
        <span>username: {uStore.username}</span>
        {uStore.username ? (
          <div>
            <button onClick={onLogout}>Log out</button>
          </div>
        ) : (
          <div>
            <NavLink to="/login">{t('auth.login')}</NavLink>
            <span>&nbsp;{t('auth.or')}&nbsp;</span>
            <NavLink to="/register">{t('auth.createAccount')}</NavLink>
          </div>
        )}
      </header>

      <Outlet />

      <footer className={css.footer}>
        <p>🌊 {t('gameTitle')} 2025 🌊</p>
      </footer>
    </main>
  );
});
export default GlobalLayout;
