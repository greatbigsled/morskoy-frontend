import { NavLink, Outlet } from 'react-router';

import css from './globalLayout.module.css';
import { useTranslation } from 'react-i18next';

export default function GlobalLayout() {
  const { t } = useTranslation();
  return (
    <main className={css.main}>
      <header className={css.header}>
        <span className={css.headerTitle}>{t('gameTitle')}</span>
        <div>
          <NavLink to="/login">{t('auth.login')}</NavLink>
          <span>&nbsp;{t('auth.or')}&nbsp;</span>
          <NavLink to="/register">{t('auth.createAccount')}</NavLink>
        </div>
      </header>

      <Outlet />

      <footer className={css.footer}>
        <p>🌊 {t('gameTitle')} 2025 🌊</p>
      </footer>
    </main>
  );
}
