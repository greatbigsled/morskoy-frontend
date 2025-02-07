import { useContext } from 'react';
import { StoreContext } from './context/store';
import { RootStore } from './store.ts';

export const useStore = (): RootStore => useContext(StoreContext);
