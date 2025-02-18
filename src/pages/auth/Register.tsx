import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { useState } from 'react';

import authCss from './auth.module.css';
import genCss from '../../styles/general.module.css';
import { useStore } from '../../store/useStore.ts';

function Register() {
  const { t } = useTranslation();
  const uStore = useStore().userStore;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onSubmit = () => {
    if (password !== passwordRepeat) {
      setError('Passwords do not match');
    } else {
      setError(null);
    }
    uStore.register(username, password);
  };

  return (
    <div>
      <p>Username is: {uStore.username}</p>
      <p>Loading is: {uStore.isLoading}</p>
      <h2>{t('auth.createAccount')}</h2>
      <form onSubmit={onSubmit}>
        <div className={authCss.fieldset}>
          <label>{t('auth.username')}</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className={genCss.textInput}
          />
        </div>
        <div className={authCss.fieldset}>
          <label>{t('auth.password')}</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={genCss.textInput}
          />
        </div>
        <div className={authCss.fieldset}>
          <label>{t('auth.repeatPassword')}</label>
          <br />
          <input
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            type="password"
            className={genCss.textInput}
          />
        </div>
        <div className={authCss.fieldset}>
          {error && <span className={authCss.error}>{error}</span>}
          <button onClick={onSubmit}>{t('auth.create')}</button>
        </div>
      </form>
      <br />
      <div>
        <h5>{t('auth.alreadyHaveAccount')}</h5>
        <NavLink to="/login">{t('auth.login')}</NavLink>
      </div>
    </div>
  );
}

export default Register;
