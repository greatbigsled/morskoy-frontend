import { action, makeObservable, observable, runInAction } from 'mobx';
import { RootStore } from './store.ts';
import { config } from '../config.ts';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'accessToken';

async function request(url: string, props?: RequestInit) {
  const { method, body, ...rest } = props || {};
  const res = await fetch(config.apiUrl + url, {
    method: method || 'GET',
    ...(body && { body }),
    headers: {
      'Content-Type': 'application/json',
    },
    ...rest,
  });
  return res.json();
}

export class UserStore {
  rootStore: RootStore;
  username: string | null = null;
  id: string | null = null;
  accessToken: string | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      username: observable,
      id: observable,
      initUser: action,
    });
    this.rootStore = rootStore;
    this.initUser();
  }

  initUser = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decoded: { id: number; login: string } = jwtDecode(accessToken);
      const { id, login } = decoded;
      this.username = login;
      this.id = `${id}`;
    }
  };

  async signIn(username: string, password: string) {
    this.error = null;
    this.isLoading = true;
    try {
      const res = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          login: username,
          password,
        }),
      });

      runInAction(() => {
        this.username = username;
        this.accessToken = res.accessToken;
        localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
      });
      return true;
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.error = e.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return false;
  }

  async register(username: string, password: string) {
    this.error = null;
    this.isLoading = true;
    try {
      const res = await request('/api/auth/registration', {
        method: 'POST',
        body: JSON.stringify({
          login: username,
          password,
        }),
      });

      runInAction(() => {
        this.username = username;
        this.accessToken = res.accessToken;
        localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
      });
      return true;
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.error = e.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return false;
  }

  async refreshToken() {
    try {
      const res = await request('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      runInAction(() => {
        this.accessToken = res.accessToken;
      });
      return res.accessToken;
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.error = e.message;
      });
    } finally {
      // runInAction(() => {
      //   this.isLoading = false;
      // });
    }
  }

  logout = () => {
    this.error = null;
    this.isLoading = true;
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    try {
      runInAction(() => {
        this.username = null;
        this.accessToken = null;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.error = e.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
