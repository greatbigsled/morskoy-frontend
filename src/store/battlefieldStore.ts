import { observable, action, makeAutoObservable } from 'mobx';
import {
  addShipToGrid,
  BattlefieldMatrix,
  createEmptyGrid,
  createNewShipCells,
  GridShipCell,
  NewShip,
} from '../game/battlefield.ts';
import { RootStore } from './store.ts';

export class BattlefieldStore {
  rootStore: RootStore;
  grid: BattlefieldMatrix;
  userShips: {
    [key: number]: NewShip[];
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      grid: observable,
      addShipToGrid: action,
      userShips: observable,
      addNewShip: action,
    });
    this.rootStore = rootStore;

    this.grid = createEmptyGrid();
    this.userShips = { 1: [], 2: [], 3: [], 4: [] };
  }

  addNewShip(newShip: NewShip) {
    const shipLength = parseInt(newShip.shipType[1]);
    const maxShipQuantityForType = 5 - shipLength;
    if (this.userShips[shipLength].length < maxShipQuantityForType) {
      this.userShips[shipLength].push(newShip);
      this.addShipToGrid(newShip);
    } else {
      console.warn('already enough ships of length of ' + shipLength);
    }
  }

  //private
  addShipToGrid(newShip: NewShip) {
    const newShipCells = createNewShipCells(newShip);
    newShipCells.forEach(({ index: [r, c], shipCellType }: GridShipCell) => {
      this.grid[r][c].shipCellType = shipCellType;
    });
  }
}
