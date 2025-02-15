import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import authCss from './auth.module.css';
import genCss from '../../styles/general.module.css';

function Login() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>Login page</h2>
      <div>
        <div className={authCss.fieldset}>
          <label>{t('auth.username')}</label>
          <br />
          <input type="text" className={genCss.textInput} />
        </div>
        <div className={authCss.fieldset}>
          <label>{t('auth.password')}</label>
          <br />
          <input type="password" className={genCss.textInput} />
        </div>
        <div className={authCss.fieldset}>
          <button>{t('auth.login')}</button>
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
