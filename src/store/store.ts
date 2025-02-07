// Create RootStore, that will contain references to other stores
import { BattlefieldStore } from './battlefieldStore.ts';
import { UserStore } from './userStore.ts';

export class RootStore {
  userStore: UserStore;
  battlefieldStore: BattlefieldStore;

  constructor() {
    // Bcause of passing this to sub stores, all stores can access RootStore and other stores
    this.userStore = new UserStore(this);
    this.battlefieldStore = new BattlefieldStore(this);
  }
}

// inititate and export store so you can use it in the app
export const store = new RootStore();
