import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { useState } from 'react';

import authCss from './auth.module.css';
import genCss from '../../styles/general.module.css';
import { useStore } from '../../store/useStore.ts';

function Login() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const uStore = useStore().userStore;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const isSuccess = await uStore.signIn(username, password);
  };

  return (
    <div>
      <p>Username is: {uStore.username}</p>
      <p>Loading is: {uStore.isLoading}</p>
      <h3>Login page</h3>
      <div>
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
          <button onClick={onSubmit}>{t('auth.login')}</button>
        </div>
        <br />
        <div>
          <h5>{t('auth.dontHaveAccount')}</h5>
          <NavLink to="/register">{t('auth.createAccount')}</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
