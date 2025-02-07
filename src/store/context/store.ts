import { createContext } from 'react';
import { RootStore } from '../store.ts';

export const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;
