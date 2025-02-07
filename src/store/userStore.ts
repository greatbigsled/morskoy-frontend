import { makeObservable, observable, action, makeAutoObservable } from 'mobx';
import { RootStore } from './store.ts';

export class UserStore {
  rootStore: RootStore;
  username = '';
  id = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      username: observable,
      id: observable,
    });
    this.rootStore = rootStore;
  }

  signIn(name: string) {
    this.username = name;
  }
}
